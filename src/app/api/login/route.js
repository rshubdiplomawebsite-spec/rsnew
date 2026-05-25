import axios from "axios";
import User from "../../../models/User";
import { oauth2client } from "../../../utils/GoogleCofig";
import { NextResponse } from "next/server";
import { connectDb } from "../../../utils/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    connectDb();
    const body = await req.json();

    const { code } = body;

    if (!code) {
      return NextResponse.json(
        {
          message: "Authorization code is required",
        },
        { status: 400 }
      );
    }

    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
      });
    }
    const token = jwt.sign({ user }, process.env.JWT_SEC);

    return NextResponse.json({
      message: `Welcome ${user.name}`,
      user,
      token,
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
