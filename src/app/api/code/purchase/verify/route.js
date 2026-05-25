import { NextResponse } from "next/server";
import crypto from "crypto";
import Order from "../../../../../models/Order";
import { connectDb } from "../../../../../utils/db";
import CheckAuth from "../../../../../middleware/isAuth";

export async function POST(request) {
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);

    const token = searchParams.get("token");
    const codeid = searchParams.get("codeid");

    const user = await CheckAuth(token);

    if (!user)
      return NextResponse.json(
        {
          message: "Please Login",
        },
        {
          status: 400,
        }
      );

    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Create expected signature
    const body_string = razorpay_order_id + "|" + razorpay_payment_id;
    const expected_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body_string)
      .digest("hex");

    // Verify signature
    if (expected_signature === razorpay_signature) {
      await Order.create({
        user: user._id,
        code: codeid,
        transectionid: razorpay_payment_id,
      });

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { success: false, error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
