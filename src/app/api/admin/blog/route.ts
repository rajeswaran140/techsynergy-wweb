import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllBlogPosts, createBlogPost } from "@/lib/models/blog";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const posts = await getAllBlogPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const post = await createBlogPost(body);
  return NextResponse.json(post, { status: 201 });
}
