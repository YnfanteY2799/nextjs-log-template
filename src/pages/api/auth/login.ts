import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export default function handler({ body }: NextApiRequest, res: NextApiResponse<{}>) {
  const { userName, password } = JSON.parse(body);

  if (userName === "admin@test.com" && password === "123") {
    const token = jwt.sign(
      {
        email: "admin@test.com",
        username: "admin",
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },
      "secret"
    );

    const serialized = serialize("tok", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.json({ status: "valid login" });
  } else {
    res.status(401).json({ status: "Done no user found" });
  }
}
