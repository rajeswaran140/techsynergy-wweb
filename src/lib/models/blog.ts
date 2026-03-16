import {
  PutCommand,
  GetCommand,
  QueryCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "../dynamodb";
import { BlogPost } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function createBlogPost(
  data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
): Promise<BlogPost> {
  const now = new Date().toISOString();
  const post: BlogPost = { ...data, id: uuidv4(), createdAt: now, updatedAt: now };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: { PK: `BLOG#${post.id}`, SK: "METADATA", GSI1PK: "BLOG", GSI1SK: now, ...post },
    })
  );
  return post;
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const result = await docClient.send(
    new GetCommand({ TableName: TABLE_NAME, Key: { PK: `BLOG#${id}`, SK: "METADATA" } })
  );
  if (!result.Item) return null;
  const { PK, SK, GSI1PK, GSI1SK, ...post } = result.Item;
  return post as BlogPost;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1PK = :pk",
      ExpressionAttributeValues: { ":pk": "BLOG" },
      ScanIndexForward: false,
    })
  );
  return (result.Items || []).map(({ PK, SK, GSI1PK, GSI1SK, ...item }) => item as BlogPost);
}

export async function updateBlogPost(
  id: string,
  data: Partial<BlogPost>
): Promise<BlogPost | null> {
  const existing = await getBlogPost(id);
  if (!existing) return null;
  const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: { PK: `BLOG#${id}`, SK: "METADATA", GSI1PK: "BLOG", GSI1SK: updated.createdAt, ...updated },
    })
  );
  return updated;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  await docClient.send(
    new DeleteCommand({ TableName: TABLE_NAME, Key: { PK: `BLOG#${id}`, SK: "METADATA" } })
  );
  return true;
}
