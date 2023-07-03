import clientPromise from "../../lib/mongodb";

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;
    // const db = client.db("test");
    // const collection = db.collection("users");
    // const user = await collection.find({}).toArray();
    // console.log(user);

    return {
      props: {
        isConnected: true,
        // user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        isConnected: false,
      },
    };
  }
}

// // import clientPromise from "../../lib/mongodb";
// import connectToDatabase from "../../lib/ConnectToDB.js";

// const getServerSideProps = async () => {
//   try {
//     await connectToDatabase;
//     // `await clientPromise` will use the default database passed in the MONGODB_URI
//     // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
//     //
//     // `const client = await clientPromise`
//     // `const db = client.db("myDatabase")`
//     //
//     // Then you can execute queries against your database like so:
//     // db.find({}) or any of the MongoDB Node Driver commands
//     const client = await connectToDatabase;
//     const db = client.db("healthTracker");
//     console.log(db.);

//     return { isConnected: true };
//   } catch (e) {
//     console.error(e);
//     return { isConnected: false };
//   }
// };

// export default { getServerSideProps };