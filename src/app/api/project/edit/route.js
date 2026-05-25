import CheckAuth from "../../../../middleware/isAuth";
import Project from "../../../../models/Project";
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ message: "Material id is required" }, { status: 400 });
    }

    const allowedFields = [
      "title",
      "description",
      "image",
      "technology",
      "category",
      "url",
      "isFree",
      "github",
      "difficulty",
      "duration",
    ];

    const payload = {};
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) payload[field] = updates[field];
    });

    const project = await Project.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json({ message: "Study material not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Study material updated",
      project,
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
