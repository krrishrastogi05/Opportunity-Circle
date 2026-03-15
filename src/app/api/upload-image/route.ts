import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/session";

// On Vercel the filesystem is read-only, so we convert to base64 data URL
// and return it directly. The editor embeds it inline.
// For production with heavy image use, swap this for Cloudinary / Vercel Blob.
export async function POST(req: NextRequest) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token)))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ message: "No file" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({ url: dataUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ message }, { status: 500 });
  }
}
