import { User } from "@lib/models/schema";
import { mongooseConnect } from "@lib/mongoose";
import { getServerAuthSession } from "@api/auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerAuthSession(req, res);
  if (!session) res.status(404);

  await mongooseConnect();

  if (req.method === "POST") {
    const data = {
      googleName: req.body.googleName,
      email: req.body.email,
      image: req.body.image,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      height: {
        height_ft: req.body.height_ft,
        height_in: req.body.height_in,
      },
      dietaryGoals: req.body.dietaryGoals,
      dietaryRestrictions: req.body.dietaryRestrictions
        ? req.body.dietaryRestrictions
        : "None",
      healthComplications: req.body.healthComplications
        ? req.body.healthComplications
        : "None",
    };

    try {
      await User.findOneAndUpdate({ email: req.body.email }, data, {
        upsert: true,
      });
      res.status(200).json();
    } catch (err) {
      res.status(400).json("error ~ ", err.message);
    }
  }

  if (req.method === "GET") {
    const email = req.query?.email;
    try {
      await User.find({ email }).then((data) => {
        return res.json(data[0]);
      });
    } catch (err) {
      res.status(400).json("error ~ ", err.message);
    }
  }
}
