import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllServices, createService } from "@/lib/models/services";
import { validateRequest, serviceSchema } from "@/lib/validation";

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

  const validation = validateRequest(serviceSchema, body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const service = await createService(validation.data);
  return NextResponse.json(service, { status: 201 });
}
