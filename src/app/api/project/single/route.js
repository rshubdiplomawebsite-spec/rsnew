import Project from "../../../../models/Project";
import { connectDb } from "../../../../utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    const project = await Project.findById(id);

    return NextResponse.json(project);
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
