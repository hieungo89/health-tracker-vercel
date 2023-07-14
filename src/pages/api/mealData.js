import { MealData } from "../../lib/models/schema";
import { mongooseConnect } from "../../lib/mongoose";
import { getServerAuthSession } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerAuthSession(req, res);
  if (!session) res.status(404);

  await mongooseConnect();

  if (req.method === "POST") {
    const data = req.body;
    const filter = {
      email: data.email,
      date: data.date,
      mealType: data.mealType,
    };

    try {
      await MealData.findOneAndUpdate(filter, data, { upsert: true });
      res.status(200).json();
    } catch (err) {
      res.status(400).json("error ~ ", err.message);
    }
  }

  if (req.method === "GET") {
    const email = req.query?.email;
    try {
      await MealData.find({ email })
        .sort({ date: 1 })
        .then((data) => {
          res.status(200).json(data);
        });
    } catch (err) {
      res.status(400).json("error ~ ", err.message);
    }
  }
}
