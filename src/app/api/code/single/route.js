import Code from "../../../../models/Code";
import { connectDb } from "../../../../utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);

    const codeid = searchParams.get("codeid");

    const id = searchParams.get("id");

    if (codeid) {
      const code = await Code.findById(codeid).select("-code");
      return NextResponse.json(code);
    }

    if (id) {
      const code = await Code.findOne({ projectid: id }).select("-code");

      return NextResponse.json(code);
    }
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
