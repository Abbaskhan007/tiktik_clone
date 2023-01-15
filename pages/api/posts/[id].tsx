// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import initDb from "../../../helpers.js/initDb";
require("../../../models/userModel");
import postModel from "../../../models/postModel";

initDb();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const { id } = req.query;
      const post = await postModel
        .findById(id)
        .populate("postedBy")
        .populate("comments.commentedBy");
      res.status(200).json(post);
      break;
  }
}
