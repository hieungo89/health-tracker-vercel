import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

// let client;
let mongoClient; // this becomes our cached connection

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const connectToDatabase = async () => {
  try {
    if (mongoClient) {
      return { mongoClient };
    }

    mongoClient = await new MongoClient(uri, options).connect();
    console.log("Connected to database");
    return { mongoClient };
  } catch (e) {
    console.error(e);
  }
};

export default connectToDatabase;

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   let globalWithMongo = global & { _mongoClientPromise };

//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     globalWithMongo._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalWithMongo._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
// export default clientPromise;
