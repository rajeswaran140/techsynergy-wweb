import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllPortfolioItems, createPortfolioItem } from "@/lib/models/portfolio";
import { validateRequest, portfolioSchema } from "@/lib/validation";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await getAllPortfolioItems();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const validation = validateRequest(portfolioSchema, body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const item = await createPortfolioItem(validation.data);
  return NextResponse.json(item, { status: 201 });
}
