// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import initDb from "../../../helpers.js/initDb";
import userModel from "../../../models/userModel";
import postModel from "../../../models/postModel";
import { user } from "../../../types/user";
import { video } from "../../../types/video";

initDb();

type Data = {
  user: user;
  likedPosts: video;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const { id } = req.query;
      const user = await userModel.findById(id);
      const likedPosts = await postModel
        .find({ likes: id })
        .populate("postedBy");
      const userPosts = await postModel
        .find({ postedBy: id })
        .populate("postedBy");
      return res.status(200).json({ user, likedPosts, userPosts });
  }
}
