import CheckAuth from "../../../../middleware/isAuth";
import Code from "../../../../models/Code";
import { connectDb } from "../../../../utils/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const user = await CheckAuth(token);

    if (!user) {
      return NextResponse.json({ message: "Please Login" }, { status: 400 });
    }

    if (user.role !== "admin") {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { id, title, price, code, projectid } = body;

    if (!id) {
      return NextResponse.json({ message: "Paid material id is required" }, { status: 400 });
    }

    const payload = {};
    if (title !== undefined) payload.title = title;
    if (price !== undefined) payload.price = Number(price);
    if (code !== undefined) payload.code = code;
    if (projectid !== undefined) payload.projectid = projectid;

    const updatedCode = await Code.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedCode) {
      return NextResponse.json({ message: "Paid material not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Paid material updated",
      code: updatedCode,
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
