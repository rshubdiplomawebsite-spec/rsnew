import CheckAuth from "../../../../middleware/isAuth";
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

    const { isFree } = body;

    if (isFree) {
      const {
        github,
        title,
        description,
        image,
        technology,
        url,
        difficulty,
        duration,
        category,
      } = body;

      const project = await Project.create({
        title,
        description,
        image,
        technology,
        url,
        github,
        isFree,
        difficulty,
        duration,
        category,
      });

      return NextResponse.json(
        {
          message: "Study material added",
          project,
        },
        { status: 200 }
      );
    } else {
      const {
        title,
        description,
        image,
        technology,
        url,
        difficulty,
        duration,
        category,
      } = body;

      const project = await Project.create({
        title,
        description,
        image,
        technology,
        url,
        isFree,
        difficulty,
        duration,
        category,
      });

      return NextResponse.json(
        {
          message: "Study material added",
          project,
        },
        { status: 200 }
      );
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
