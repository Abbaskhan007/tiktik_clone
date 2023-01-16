// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
require("../../../models/userModel");
import postModel from "../../../models/postModel";
import initDb from "../../../helpers.js/initDb";
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
      const data = await postModel.find({}).populate("postedBy");
      console.log("-------", data);
      return res.status(200).json(data);
      break;

    case "POST":
      const { postedBy, video, caption, category } = req.body;
      if (!postedBy || !video || !caption || !category) {
        return res
          .status(404)
          .json({ message: "Please fill all the required fields" });
      }
      const post = new postModel({ postedBy, caption, video, category });
      post.save((err: any, data: any) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: err.message });
        }
        res.status(200).json(data);
      });
    case "PUT":
      const { postId, comment, userId } = req.body;
      const updatedPost = await postModel
        .findByIdAndUpdate(
          postId,
          {
            $push: { comments: { comment, commentedBy: userId } },
          },
          { new: true }
        )
        .populate("postedBy")
        .populate("comments.commentedBy");
      res.status(200).json(updatedPost);
  }
}
