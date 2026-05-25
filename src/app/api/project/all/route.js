import Project from "../../../../models/Project";
import { connectDb } from "../../../../utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const category = searchParams.get("category");

    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }
    const totalProjects = await Project.countDocuments();

    const limit = 6;

    const totalPages = Math.ceil(totalProjects / limit);

    const skip = (page - 1) * limit;
    const projects = await Project.find(filter)
      .sort("-createdAt")
      .limit(limit)
      .skip(skip);

    const latest = await Project.find().sort("-createdAt").limit(5);

    return NextResponse.json({ projects, totalPages, latest });
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
