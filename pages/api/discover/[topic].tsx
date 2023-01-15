// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import initDb from "../../../helpers.js/initDb";
require("../../../models/userModel");
import postModel from "../../../models/postModel";
import { user } from "../../../types/user";
import { video } from "../../../types/video";

initDb();

type Data = {
  posts: video[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const { topic } = req.query;
      const posts = await postModel
        .find({ category: topic })
        .populate("postedBy");

      return res.status(200).json(posts);
  }
}
