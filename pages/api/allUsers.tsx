import type { NextApiRequest, NextApiResponse } from "next";
import initDb from "../../helpers.js/initDb";
import userModel from "../../models/userModel";

initDb();

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const users = await userModel.find({}).limit(5);
      res.status(200).json(users);
      break;
  }
}
