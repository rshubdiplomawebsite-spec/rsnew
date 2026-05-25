import CheckAuth from "../../../../middleware/isAuth";
import Code from "../../../../models/Code";
import Project from "../../../../models/Project";
import { connectDb } from "../../../../utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");

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

    if (user.role !== "admin") {
      return NextResponse.json(
        {
          message: "You are not admin",
        },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();

    const { projectid, title, price, code } = body;

    const project = await Project.findById(projectid);

    if (project.isFree) {
      return NextResponse.json(
        {
          message: "This study material is available for free",
        },
        {
          status: 400,
        }
      );
    }

    const createdCode = await Code.create({
      title,
      price,
      code,
      projectid,
    });

    return NextResponse.json({
      message: "Paid material added",
      createdCode,
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
