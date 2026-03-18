import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllBlogPosts, createBlogPost } from "@/lib/models/blog";
import { validateRequest, blogPostSchema } from "@/lib/validation";

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

  const validation = validateRequest(blogPostSchema, body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const post = await createBlogPost(validation.data);
  return NextResponse.json(post, { status: 201 });
}
