import { NextResponse } from "next/server";
import razorpay from "../../../../../utils/razorpay";
import Code from "../../../../../models/Code";
import { connectDb } from "../../../../../utils/db";
import CheckAuth from "../../../../../middleware/isAuth";

export async function POST(request) {
  try {
    await connectDb();
    const { searchParams } = new URL(request.url); // fixed here

    const token = searchParams.get("token");
    const user = await CheckAuth(token);

    if (!user) {
      return NextResponse.json({ message: "Please Login" }, { status: 400 });
    }

    const body = await request.json();
    const { id } = body;

    const code = await Code.findById(id).select("-code");

    const options = {
      amount: Number(code.price * 100),
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      order,
      code,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { success: false, message: "There is someting error" },
      { status: 500 }
    );
  }
}
