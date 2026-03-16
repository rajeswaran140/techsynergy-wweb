import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllPortfolioItems, createPortfolioItem } from "@/lib/models/portfolio";

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
  const item = await createPortfolioItem(body);
  return NextResponse.json(item, { status: 201 });
}
