import { User } from "@lib/models/schema";
import { mongooseConnect } from "@lib/mongoose";
import { models } from "mongoose";

export default async function handler(req, res) {
  console.log("Mongoose Models ~ ", models);
  const { method } = req;
  const connected = await mongooseConnect();

  if (method === "POST") {
    const { username } = req.body;
    try {
      const result = await User.create({
        username,
      });

      res.json(result);
    } catch (err) {
      console.log("error ~ ", err.message);
    }
  }
}
