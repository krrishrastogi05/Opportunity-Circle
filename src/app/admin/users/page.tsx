import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/session";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

interface UserRow {
  _id: string;
  name?: string;
  email: string;
  branch?: string;
  graduationYear?: number;
  gender?: string;
  profileCompleted?: boolean;
  alertsEnabled?: boolean;
  digestEnabled?: boolean;
  createdAt?: string;
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}

export default async function AdminUsersPage() {
  // Defense in depth — middleware already gates /admin, but verify here too.
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    redirect("/admin/login");
  }

  await connectDB();
  const docs = await User.find()
    .select(
      "name email branch graduationYear gender profileCompleted alertsEnabled digestEnabled createdAt"
    )
    .sort({ createdAt: -1 })
    .lean();

  const users: UserRow[] = JSON.parse(JSON.stringify(docs));

  const total = users.length;
  const completed = users.filter((u) => u.profileCompleted).length;
  const alerts = users.filter((u) => u.alertsEnabled).length;
  const digest = users.filter((u) => u.digestEnabled).length;

  const fmt = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <span className="text-sm text-muted-foreground">{total} total</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <Stat label="Total sign-ups" value={total} />
        <Stat label="Completed profile" value={completed} />
        <Stat label="Alerts enabled" value={alerts} />
        <Stat label="Weekly digest" value={digest} />
      </div>

      {/* Table */}
      {users.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No users yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Branch</th>
                <th className="px-4 py-3 font-medium">Grad</th>
                <th className="px-4 py-3 font-medium">Gender</th>
                <th className="px-4 py-3 font-medium">Prefs</th>
                <th className="px-4 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-border last:border-0 hover:bg-accent/20"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium">{u.name || "—"}</span>
                    {!u.profileCompleted && (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        incomplete
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs max-w-[180px] truncate">
                    {u.branch || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {u.graduationYear || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {u.gender || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {u.alertsEnabled ? "Alerts" : ""}
                    {u.alertsEnabled && u.digestEnabled ? " · " : ""}
                    {u.digestEnabled ? "Digest" : ""}
                    {!u.alertsEnabled && !u.digestEnabled ? "—" : ""}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {fmt(u.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
