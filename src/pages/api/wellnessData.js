import { UserData } from "../../lib/models/schema";
import { mongooseConnect } from "../../lib/mongoose";
import { getServerAuthSession } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerAuthSession(req, res);
  if (!session) res.status(404);

  await mongooseConnect();

  if (req.method === "POST") {
    const data = req.body;
    const filter = { date: data.date };

    try {
      await UserData.findOneAndUpdate(filter, data, { upsert: true });
      res.status(200).json();
    } catch (err) {
      console.log("error ~ ", err.message);
      res.status(400);
    }
  }

  if (req.method === "GET") {
    const email = req.query?.email;
    try {
      await UserData.find({ email }).then((data) => {
        res.status(200).json(data[0]);
      });
    } catch (err) {
      console.log("error ~ ", err.message);
    }
  }
}
