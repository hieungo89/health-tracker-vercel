import { User } from "../../lib/models/schema";
import { mongooseConnect } from "../../lib/mongoose";
import { getServerAuthSession } from "./auth/[...nextauth]";
// import { models } from "mongoose";

export default async function handler(req, res) {
  // console.log("Mongoose Models ~ ", models);
  const session = await getServerAuthSession(req, res);
  if (!session) {
    res.status(404);
  }

  await mongooseConnect();

  if (req.method === "POST") {
    const {
      googleName,
      email,
      image,
      firstName,
      lastName,
      birthday,
      height_ft,
      height_in,
      dietary_goals,
      dietary_restrictions,
      health_complications,
    } = req.body;

    try {
      await User.create({
        googleName,
        email,
        image,
        firstName,
        lastName,
        birthday,
        height_ft,
        height_in,
        dietaryGoals: dietary_goals,
        dietaryRestrictions: dietary_restrictions ? dietary_restrictions : null,
        healthComplications: health_complications
          ? health_complications
          : "none",
      }).then((result) => {
        res.status(200).json(result);
      });
    } catch (err) {
      console.log("error ~ ", err.message);
    }
  }

  if (req.method === "GET") {
    const email = req.query?.email;
    try {
      await User.find({ email }).then((data) => {
        return res.json(data[0]);
      });
    } catch (err) {
      console.log("error ~ ", err.message);
    }
  }
}
