import { NextResponse } from "next/server";
import Code from "../../../../../models/Code";
import { connectDb } from "../../../../../utils/db";
import CheckAuth from "../../../../../middleware/isAuth";
import Order from "../../../../../models/Order";

export async function GET(request) {
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);

    const token = searchParams.get("token");
    const user = await CheckAuth(token);

    if (!user) {
      return NextResponse.json({ message: "Please Login" }, { status: 400 });
    }

    const orders = await Order.find({ user: user._id });

    const codes = await Promise.all(
      orders.map((order) => Code.findById(order.code))
    );

    return NextResponse.json(codes);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
