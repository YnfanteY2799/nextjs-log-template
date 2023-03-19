import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import cookie from "cookie";

export default function handler({ cookies }: NextApiRequest, res: NextApiResponse<{}>) {
  const { tok } = cookies;

  if (!tok) {
    return res.status(401).send({ data: "No hay token" });
  } else {
    try {
      verify(tok, "secret");
      const serialized = cookie.serialize("tok", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialized);
      res.status(200).send({ status: "Logged out correctly" });
    } catch (e) {}

    // return res.status(401).send({ data: "No hay token" });
  }
}
