import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not set");
  process.exit(1);
}

const Opportunity =
  mongoose.models.Opportunity ||
  mongoose.model("Opportunity", new mongoose.Schema({}, { strict: false, timestamps: true }));

async function run() {
  await mongoose.connect(MONGODB_URI!);
  const res = await Opportunity.updateOne(
    { slug: "flipkart-gridlock-2" },
    { $set: { closesAt: new Date("2026-06-05T23:59:00+05:30") } }
  );
  console.log(
    `matched ${res.matchedCount}, modified ${res.modifiedCount} — Gridlock closesAt -> 5 June 2026 23:59 IST`
  );
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
