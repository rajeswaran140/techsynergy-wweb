import {
  PutCommand,
  GetCommand,
  QueryCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "../dynamodb";
import { PortfolioItem } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function createPortfolioItem(
  data: Omit<PortfolioItem, "id" | "createdAt" | "updatedAt">
): Promise<PortfolioItem> {
  const now = new Date().toISOString();
  const item: PortfolioItem = { ...data, id: uuidv4(), createdAt: now, updatedAt: now };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: { PK: `PORTFOLIO#${item.id}`, SK: "METADATA", GSI1PK: "PORTFOLIO", GSI1SK: now, ...item },
    })
  );
  return item;
}

export async function getPortfolioItem(id: string): Promise<PortfolioItem | null> {
  const result = await docClient.send(
    new GetCommand({ TableName: TABLE_NAME, Key: { PK: `PORTFOLIO#${id}`, SK: "METADATA" } })
  );
  if (!result.Item) return null;
  const { PK, SK, GSI1PK, GSI1SK, ...item } = result.Item;
  return item as PortfolioItem;
}

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1PK = :pk",
      ExpressionAttributeValues: { ":pk": "PORTFOLIO" },
      ScanIndexForward: false,
    })
  );
  return (result.Items || []).map(({ PK, SK, GSI1PK, GSI1SK, ...item }) => item as PortfolioItem);
}

export async function updatePortfolioItem(
  id: string,
  data: Partial<PortfolioItem>
): Promise<PortfolioItem | null> {
  const existing = await getPortfolioItem(id);
  if (!existing) return null;
  const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: { PK: `PORTFOLIO#${id}`, SK: "METADATA", GSI1PK: "PORTFOLIO", GSI1SK: updated.createdAt, ...updated },
    })
  );
  return updated;
}

export async function deletePortfolioItem(id: string): Promise<boolean> {
  await docClient.send(
    new DeleteCommand({ TableName: TABLE_NAME, Key: { PK: `PORTFOLIO#${id}`, SK: "METADATA" } })
  );
  return true;
}
