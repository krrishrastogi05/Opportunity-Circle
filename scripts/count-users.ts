import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not set");
    process.exit(1);
  }
  await mongoose.connect(uri);
  const db = mongoose.connection.db!;

  const users = await db.collection("users").countDocuments();
  const completed = await db
    .collection("users")
    .countDocuments({ profileCompleted: true });
  const alerts = await db
    .collection("users")
    .countDocuments({ alertsEnabled: true });
  const withBranch = await db
    .collection("users")
    .countDocuments({ branch: { $exists: true, $ne: null } });

  console.log("─────────────────────────────");
  console.log(`Total users:            ${users}`);
  console.log(`Completed onboarding:   ${completed}`);
  console.log(`Alerts enabled:         ${alerts}`);
  console.log(`Set a branch:           ${withBranch}`);
  console.log("─────────────────────────────");

  // Recent sign-ups (latest 10)
  const recent = await db
    .collection("users")
    .find({}, { projection: { email: 1, name: 1, branch: 1, graduationYear: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();
  if (recent.length) {
    console.log("Latest sign-ups:");
    for (const u of recent) {
      console.log(
        `  ${u.name ?? "—"} | ${u.email} | ${u.branch ?? "no branch"} | ${u.graduationYear ?? "—"}`
      );
    }
  }

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
