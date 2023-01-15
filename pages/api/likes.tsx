// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import initDb from "../../helpers.js/initDb";
require("../../models/userModel");
import postModel from "../../models/postModel";

initDb();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      const { postId, userId, isLiked } = req.body;

      const post = await postModel.findById(postId);
      console.log("---- ids: ", userId, post);

      if (isLiked) {
        const updatedPost = await postModel
          .findByIdAndUpdate(
            postId,
            {
              $pull: { likes: userId },
            },
            { new: true }
          )
          .populate("postedBy")
          .populate("comments.commentedBy");
        res.status(200).json(updatedPost);
      } else {
        const updatedPost = await postModel
          .findByIdAndUpdate(
            postId,
            {
              $push: { likes: userId },
            },
            { new: true }
          )
          .populate("postedBy")
          .populate("comments.commentedBy");

        res.status(200).json(updatedPost);
      }
  }
}
