import CheckAuth from "../../../../middleware/isAuth";
import Code from "../../../../models/Code";
import Order from "../../../../models/Order";
import Project from "../../../../models/Project";
import User from "../../../../models/User";
import { connectDb } from "../../../../utils/db";
import { NextResponse } from "next/server";

function isAdmin(user) {
  return user?.role === "admin";
}

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const user = await CheckAuth(token);

    if (!user) {
      return NextResponse.json({ message: "Please Login" }, { status: 400 });
    }

    if (!isAdmin(user)) {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 });
    }

    const [projects, codes, users, orders] = await Promise.all([
      Project.find().sort("-createdAt").lean(),
      Code.find().sort("-createdAt").lean(),
      User.find().sort("-createdAt").select("-__v").lean(),
      Order.find().sort("-createdAt").lean(),
    ]);

    const codeMap = new Map(codes.map((code) => [String(code._id), code]));
    const userMap = new Map(users.map((item) => [String(item._id), item]));
    const projectMap = new Map(projects.map((project) => [String(project._id), project]));

    const enrichedOrders = orders.map((order) => {
      const code = codeMap.get(String(order.code));
      const orderUser = userMap.get(String(order.user));
      const material = code ? projectMap.get(String(code.projectid)) : null;

      return {
        ...order,
        userDetails: orderUser
          ? {
              _id: orderUser._id,
              name: orderUser.name,
              email: orderUser.email,
              image: orderUser.image,
            }
          : null,
        materialDetails: material
          ? {
              _id: material._id,
              title: material.title,
              category: material.category,
            }
          : null,
        paidMaterial: code
          ? {
              _id: code._id,
              title: code.title,
              price: code.price,
              projectid: code.projectid,
            }
          : null,
      };
    });

    const totalSales = enrichedOrders.reduce(
      (sum, order) => sum + Number(order.paidMaterial?.price || 0),
      0
    );

    return NextResponse.json({
      stats: {
        totalSales,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalMaterials: projects.length,
      },
      projects,
      codes,
      users,
      orders: enrichedOrders,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
