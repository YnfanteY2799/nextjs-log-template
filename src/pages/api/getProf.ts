import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

export default function handler({ body, cookies }: NextApiRequest, res: NextApiResponse<{}>) {
  const { tok } = cookies;

  if (tok) {
    const uData = verify(tok, "secret");
    console.log(uData);
    res.json({ data: 123 });
} else {
    console.log("!@first");
    res.json({});
  }

}
