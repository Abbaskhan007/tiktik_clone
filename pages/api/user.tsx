// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import initDb from "../../helpers.js/initDb";
import userModel from "../../models/userModel";
import bcrypt from "bcrypt";
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
      var { email, password } = req.query;
      console.log("Email and Password", email, password);
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please Enter Email and Password" });
      }

      const findUser = await userModel.findOne({ email });
      if (!findUser) {
        return res.status(404).json({ message: "Incorrect Email or Password" });
      }

      if (bcrypt.compare(password, findUser.password)) {
        res.status(200).json({ user: findUser });
      } else {
        return res.status(404).json({ message: "Incorrect Email or Password" });
      }

    case "POST":
      var { name, email, password, profileImage } = req.body;
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        res.status(400).json({ message: "User with this email already exist" });
        return;
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const user = new userModel({
        name,
        email,
        password: hashPassword,
        profileImage,
      });
      user.save((err: any, user: any) => {
        console.log("user", user);
        if (err) {
          res.status(400).send({ message: err.message });
          return;
        }
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
        });
      });
  }
}
