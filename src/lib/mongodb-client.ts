import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise: Promise<MongoClient> | undefined;
};

// Lazy — the connection is only initiated when the promise is awaited,
// not at module-evaluation time, so the build won't crash.
const clientPromise: Promise<MongoClient> =
  globalForMongo._mongoClientPromise ??
  new Promise<MongoClient>((resolve, reject) => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      reject(new Error("MONGODB_URI environment variable is not set"));
      return;
    }
    const client = new MongoClient(uri);
    client.connect().then(resolve).catch(reject);
  });

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClientPromise = clientPromise;
}

export { clientPromise };
