import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllInquiries, updateInquiryStatus } from "@/lib/models/inquiries";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const inquiries = await getAllInquiries();
  return NextResponse.json(inquiries);
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await request.json();
  await updateInquiryStatus(id, status);
  return NextResponse.json({ message: "Updated" });
}
