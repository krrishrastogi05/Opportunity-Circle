import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/session";
import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import {
  OPPORTUNITY_CATEGORIES,
  ROUTE_SEGMENTS,
  type OpportunityCategory,
} from "@/lib/opportunity-constants";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

const RESERVED_SLUGS = new Set(ROUTE_SEGMENTS);

interface ImportResult {
  inserted: number;
  skipped: number;
  errors: { index: number; title?: string; reason: string }[];
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const items: unknown[] = Array.isArray(body)
      ? body
      : Array.isArray(body?.opportunities)
        ? body.opportunities
        : [];

    if (items.length === 0) {
      return NextResponse.json(
        { message: "Provide a JSON array or { opportunities: [...] }" },
        { status: 400 }
      );
    }

    const result: ImportResult = { inserted: 0, skipped: 0, errors: [] };

    for (let i = 0; i < items.length; i++) {
      const raw = items[i] as Record<string, unknown>;
      const title = typeof raw?.title === "string" ? raw.title.trim() : "";
      const category = raw?.category as string;

      // Validate
      if (!title) {
        result.errors.push({ index: i, reason: "Missing title" });
        result.skipped++;
        continue;
      }
      if (!OPPORTUNITY_CATEGORIES.includes(category as never)) {
        result.errors.push({
          index: i,
          title,
          reason: `Invalid category "${category}". Allowed: ${OPPORTUNITY_CATEGORIES.join(", ")}`,
        });
        result.skipped++;
        continue;
      }

      // Slug — generate, avoid reserved + collisions
      let slug =
        typeof raw.slug === "string" && raw.slug ? raw.slug : slugify(title);
      if (RESERVED_SLUGS.has(slug)) slug = `${slug}-opp`;
      const exists = await Opportunity.findOne({ slug });
      if (exists) slug = `${slug}-${Date.now().toString(36)}`;

      try {
        await Opportunity.create({
          ...raw,
          title,
          slug,
          category: category as OpportunityCategory,
          // normalise arrays so partial JSON doesn't break the schema
          rounds: Array.isArray(raw.rounds) ? raw.rounds : [],
          steps: Array.isArray(raw.steps) ? raw.steps : [],
          timeline: Array.isArray(raw.timeline) ? raw.timeline : [],
          tips: Array.isArray(raw.tips) ? raw.tips : [],
          tags: Array.isArray(raw.tags) ? raw.tags : [],
        });
        result.inserted++;
      } catch (e) {
        result.errors.push({
          index: i,
          title,
          reason: e instanceof Error ? e.message : "Insert failed",
        });
        result.skipped++;
      }
    }

    return NextResponse.json(result);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Bulk import failed";
    return NextResponse.json({ message }, { status: 500 });
  }
}
