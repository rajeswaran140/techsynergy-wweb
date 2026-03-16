import {
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "../dynamodb";
import { Inquiry } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function createInquiry(
  data: Omit<Inquiry, "id" | "status" | "createdAt">
): Promise<Inquiry> {
  const now = new Date().toISOString();
  const inquiry: Inquiry = { ...data, id: uuidv4(), status: "new", createdAt: now };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: { PK: `INQUIRY#${inquiry.id}`, SK: "METADATA", GSI1PK: "INQUIRY", GSI1SK: now, ...inquiry },
    })
  );
  return inquiry;
}

export async function getAllInquiries(): Promise<Inquiry[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1PK = :pk",
      ExpressionAttributeValues: { ":pk": "INQUIRY" },
      ScanIndexForward: false,
    })
  );
  return (result.Items || []).map(({ PK, SK, GSI1PK, GSI1SK, ...item }) => item as Inquiry);
}

export async function updateInquiryStatus(
  id: string,
  status: Inquiry["status"]
): Promise<boolean> {
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: `INQUIRY#${id}`, SK: "METADATA" },
      UpdateExpression: "SET #status = :status",
      ExpressionAttributeNames: { "#status": "status" },
      ExpressionAttributeValues: { ":status": status },
    })
  );
  return true;
}
