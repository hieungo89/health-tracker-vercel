import { getUsers } from "@lib/dbQuery";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { user, error } = await getUsers();
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} is not allowed`);
};

export default handler;

// const handler = async (req, res) => {
//   console.log("client", client, req);
//   const db = client.db("healthTracker");
//   const collection = db.collection("user");
//   const user = await collection.find({}).toArray();
//   console.log("handler ~ ", user);

//   return {
//     props: {
//       isConnected: true,
//       // user: JSON.parse(JSON.stringify(user)),
//     },
//   };
// };

// export default handler;
