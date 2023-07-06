import { User } from "../../lib/models/schema";
import { mongooseConnect } from "../../lib/mongoose";
// import { models } from "mongoose";

export default async function handler(req, res) {
  // console.log("Mongoose Models ~ ", models);
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const {
      username,
      firstName,
      lastName,
      age,
      birthday,
      height_ft,
      height_in,
      dietary_goals,
      dietary_restrictions,
      health_complications,
    } = req.body;

    try {
      await User.create({
        username,
        firstName,
        lastName,
        age,
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

  if (method === "GET") {
    const username = req.query?.username;
    try {
      await User.find({ username }).then((data) => {
        return res.json(data[0]);
      });
    } catch (err) {
      console.log("error ~ ", err.message);
    }
  }
}
