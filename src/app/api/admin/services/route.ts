import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllServices, createService } from "@/lib/models/services";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const services = await getAllServices();
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const service = await createService(body);
  return NextResponse.json(service, { status: 201 });
}
