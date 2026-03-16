import {
  PutCommand,
  GetCommand,
  QueryCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "../dynamodb";
import { Service } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function createService(
  data: Omit<Service, "id" | "createdAt" | "updatedAt">
): Promise<Service> {
  const now = new Date().toISOString();
  const service: Service = {
    ...data,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `SERVICE#${service.id}`,
        SK: "METADATA",
        GSI1PK: "SERVICE",
        GSI1SK: now,
        ...service,
      },
    })
  );

  return service;
}

export async function getService(id: string): Promise<Service | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: `SERVICE#${id}`, SK: "METADATA" },
    })
  );
  if (!result.Item) return null;
  const { PK, SK, GSI1PK, GSI1SK, ...service } = result.Item;
  return service as Service;
}

export async function getAllServices(): Promise<Service[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1PK = :pk",
      ExpressionAttributeValues: { ":pk": "SERVICE" },
      ScanIndexForward: true,
    })
  );
  return (result.Items || []).map(({ PK, SK, GSI1PK, GSI1SK, ...item }) => item as Service);
}

export async function updateService(
  id: string,
  data: Partial<Service>
): Promise<Service | null> {
  const existing = await getService(id);
  if (!existing) return null;

  const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `SERVICE#${id}`,
        SK: "METADATA",
        GSI1PK: "SERVICE",
        GSI1SK: updated.createdAt,
        ...updated,
      },
    })
  );
  return updated;
}

export async function deleteService(id: string): Promise<boolean> {
  await docClient.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { PK: `SERVICE#${id}`, SK: "METADATA" },
    })
  );
  return true;
}
