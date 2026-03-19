# WebhookHQ - DDD/TDD Architecture

**Architecture Approach:** Domain-Driven Design (DDD) + Test-Driven Development (TDD)
**Philosophy:** Pragmatic, testable, maintainable, interoperable
**Timeline:** 3 weeks with 80%+ test coverage

---

## 🏛️ Architecture Overview

### Layered Architecture (DDD)

```
┌─────────────────────────────────────────────────────────┐
│              Presentation Layer (UI)                    │
│         Next.js Pages + React Components                │
│  - Webhook Dashboard, Request Viewer, Settings UI       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│            Application Layer (Use Cases)                │
│         Business Logic Orchestration                    │
│  - CreateEndpoint, ReceiveWebhook, ReplayRequest        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Domain Layer (Core Business)               │
│         Pure Business Logic - No Dependencies           │
│  - Endpoint (Aggregate), WebhookRequest (Entity)        │
│  - EndpointId, RequestPayload (Value Objects)           │
│  - Domain Events, Business Rules                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│         Infrastructure Layer (Technical Details)        │
│         External Systems & Implementations              │
│  - DynamoDBEndpointRepository                           │
│  - LambdaWebhookReceiver, RedisEventPublisher           │
└─────────────────────────────────────────────────────────┘
```

### Key Principles

1. **Domain First** - Start with domain models, not database tables
2. **Test First** - Write tests before implementation (TDD)
3. **Dependency Inversion** - Domain layer has zero dependencies
4. **Pragmatic** - Use DDD where it adds value, skip ceremony where it doesn't
5. **Interoperability** - All layers communicate through well-defined interfaces

---

## 🎯 Bounded Contexts

### Context Map

```
┌──────────────────────────────────────────────────────────────┐
│                      WebhookHQ System                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐         ┌──────────────────┐          │
│  │   Endpoint      │◄────────┤   Webhook        │          │
│  │   Management    │         │   Reception      │          │
│  │   Context       │         │   Context        │          │
│  └────────┬────────┘         └─────────┬────────┘          │
│           │                            │                    │
│           │                            │                    │
│           ▼                            ▼                    │
│  ┌─────────────────┐         ┌──────────────────┐          │
│  │   User &        │         │   Notification   │          │
│  │   Billing       │         │   & Forwarding   │          │
│  │   Context       │         │   Context        │          │
│  └─────────────────┘         └──────────────────┘          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 1. Endpoint Management Context

**Responsibility:** Creating, configuring, and managing webhook endpoints

**Domain Model:**
- `Endpoint` (Aggregate Root)
- `EndpointId`, `EndpointUrl`, `CustomResponse` (Value Objects)
- `EndpointConfiguration` (Entity)

**Use Cases:**
- Create Endpoint
- Update Endpoint Configuration
- Delete Endpoint
- List User Endpoints

---

### 2. Webhook Reception Context

**Responsibility:** Receiving, storing, and processing incoming webhook requests

**Domain Model:**
- `WebhookRequest` (Aggregate Root)
- `RequestId`, `HttpMethod`, `RequestPayload` (Value Objects)
- `RequestMetadata` (Value Object)

**Use Cases:**
- Receive Webhook Request
- Retrieve Request History
- Replay Request
- Search Requests

---

### 3. User & Billing Context

**Responsibility:** User accounts, authentication, subscription management

**Domain Model:**
- `User` (Aggregate Root)
- `Subscription` (Entity)
- `UserId`, `Email`, `SubscriptionPlan` (Value Objects)

**Use Cases:**
- Register User
- Upgrade/Downgrade Subscription
- Track Usage Limits

---

### 4. Notification & Forwarding Context

**Responsibility:** Real-time notifications and request forwarding

**Domain Model:**
- `ForwardingRule` (Entity)
- `WebSocketConnection` (Value Object)

**Use Cases:**
- Notify Connected Clients
- Forward Request to External URL

---

## 🏗️ Domain Model Design

### Endpoint Management Context

#### Aggregate: `Endpoint`

```typescript
// src/domain/endpoint/Endpoint.ts

import { EndpointId } from './value-objects/EndpointId';
import { EndpointUrl } from './value-objects/EndpointUrl';
import { CustomResponse } from './value-objects/CustomResponse';
import { ForwardingConfig } from './value-objects/ForwardingConfig';
import { DomainEvent } from '../shared/DomainEvent';
import { EndpointCreated, EndpointConfigured } from './events';

export class Endpoint {
  private constructor(
    private readonly id: EndpointId,
    private readonly url: EndpointUrl,
    private name: string,
    private description: string,
    private customResponse: CustomResponse,
    private forwardingConfig: ForwardingConfig | null,
    private readonly createdAt: Date,
    private expiresAt: Date | null,
    private readonly domainEvents: DomainEvent[] = []
  ) {}

  // Factory method (TDD: test creating endpoint with valid data)
  static create(params: {
    name: string;
    description?: string;
    userId?: string;
    plan: 'free' | 'starter' | 'pro' | 'enterprise';
  }): Endpoint {
    const id = EndpointId.generate();
    const url = EndpointUrl.fromId(id);
    const expiresAt = params.plan === 'free'
      ? new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      : null;

    const endpoint = new Endpoint(
      id,
      url,
      params.name,
      params.description || '',
      CustomResponse.default(),
      null,
      new Date(),
      expiresAt
    );

    endpoint.addDomainEvent(new EndpointCreated(id, url, params.userId));
    return endpoint;
  }

  // Business logic: Configure custom response
  configureResponse(statusCode: number, body: string, headers: Record<string, string>): void {
    // TDD: test validates status code range
    if (statusCode < 100 || statusCode > 599) {
      throw new Error('Invalid HTTP status code');
    }

    this.customResponse = CustomResponse.create(statusCode, body, headers);
    this.addDomainEvent(new EndpointConfigured(this.id));
  }

  // Business logic: Enable forwarding
  enableForwarding(targetUrl: string): void {
    // TDD: test validates URL format
    if (!targetUrl.match(/^https?:\/\/.+/)) {
      throw new Error('Invalid forwarding URL');
    }

    this.forwardingConfig = ForwardingConfig.create(targetUrl);
  }

  // Business rule: Check if endpoint is expired
  isExpired(): boolean {
    return this.expiresAt !== null && this.expiresAt < new Date();
  }

  // Getters
  getId(): EndpointId { return this.id; }
  getUrl(): EndpointUrl { return this.url; }
  getName(): string { return this.name; }
  getCustomResponse(): CustomResponse { return this.customResponse; }
  getForwardingConfig(): ForwardingConfig | null { return this.forwardingConfig; }
  getDomainEvents(): DomainEvent[] { return [...this.domainEvents]; }

  private addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  clearDomainEvents(): void {
    this.domainEvents.length = 0;
  }
}
```

#### Value Object: `EndpointId`

```typescript
// src/domain/endpoint/value-objects/EndpointId.ts

import { v4 as uuidv4 } from 'uuid';

export class EndpointId {
  private constructor(private readonly value: string) {
    this.validate();
  }

  static generate(): EndpointId {
    return new EndpointId(uuidv4());
  }

  static fromString(value: string): EndpointId {
    return new EndpointId(value);
  }

  private validate(): void {
    // TDD: test UUID format validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(this.value)) {
      throw new Error('Invalid endpoint ID format');
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: EndpointId): boolean {
    return this.value === other.value;
  }
}
```

#### Value Object: `CustomResponse`

```typescript
// src/domain/endpoint/value-objects/CustomResponse.ts

export class CustomResponse {
  private constructor(
    private readonly statusCode: number,
    private readonly body: string,
    private readonly headers: Record<string, string>,
    private readonly delay: number = 0
  ) {
    this.validate();
  }

  static default(): CustomResponse {
    return new CustomResponse(200, '', {}, 0);
  }

  static create(
    statusCode: number,
    body: string,
    headers: Record<string, string> = {},
    delay: number = 0
  ): CustomResponse {
    return new CustomResponse(statusCode, body, headers, delay);
  }

  private validate(): void {
    // TDD: test status code range
    if (this.statusCode < 100 || this.statusCode > 599) {
      throw new Error('Status code must be between 100 and 599');
    }

    // TDD: test delay range
    if (this.delay < 0 || this.delay > 10000) {
      throw new Error('Delay must be between 0 and 10000ms');
    }

    // TDD: test body size limit (100KB)
    if (this.body.length > 100 * 1024) {
      throw new Error('Response body cannot exceed 100KB');
    }
  }

  getStatusCode(): number { return this.statusCode; }
  getBody(): string { return this.body; }
  getHeaders(): Record<string, string> { return { ...this.headers }; }
  getDelay(): number { return this.delay; }

  toJSON() {
    return {
      statusCode: this.statusCode,
      body: this.body,
      headers: this.headers,
      delay: this.delay,
    };
  }
}
```

---

### Webhook Reception Context

#### Aggregate: `WebhookRequest`

```typescript
// src/domain/webhook/WebhookRequest.ts

import { RequestId } from './value-objects/RequestId';
import { EndpointId } from '../endpoint/value-objects/EndpointId';
import { HttpMethod } from './value-objects/HttpMethod';
import { RequestPayload } from './value-objects/RequestPayload';
import { RequestMetadata } from './value-objects/RequestMetadata';

export class WebhookRequest {
  private constructor(
    private readonly id: RequestId,
    private readonly endpointId: EndpointId,
    private readonly method: HttpMethod,
    private readonly payload: RequestPayload,
    private readonly metadata: RequestMetadata,
    private readonly receivedAt: Date
  ) {}

  static receive(params: {
    endpointId: EndpointId;
    method: string;
    headers: Record<string, string>;
    body: string;
    queryParams: Record<string, string>;
    sourceIp: string;
  }): WebhookRequest {
    // TDD: test request creation with all fields
    return new WebhookRequest(
      RequestId.generate(),
      params.endpointId,
      HttpMethod.fromString(params.method),
      RequestPayload.create(params.headers, params.body, params.queryParams),
      RequestMetadata.create(params.sourceIp, params.headers['user-agent'] || ''),
      new Date()
    );
  }

  // Business logic: Create replay request
  replay(targetUrl: string): ReplayRequest {
    // TDD: test replay creates new request with same payload
    return ReplayRequest.create(
      this.method,
      this.payload,
      targetUrl
    );
  }

  // Business rule: Check if request body is JSON
  isJsonContent(): boolean {
    return this.payload.isJsonContent();
  }

  // Business rule: Check if request is expired based on retention
  isExpired(retentionDays: number): boolean {
    const expiryDate = new Date(this.receivedAt);
    expiryDate.setDate(expiryDate.getDate() + retentionDays);
    return expiryDate < new Date();
  }

  getId(): RequestId { return this.id; }
  getEndpointId(): EndpointId { return this.endpointId; }
  getMethod(): HttpMethod { return this.method; }
  getPayload(): RequestPayload { return this.payload; }
  getMetadata(): RequestMetadata { return this.metadata; }
  getReceivedAt(): Date { return this.receivedAt; }
}
```

#### Value Object: `HttpMethod`

```typescript
// src/domain/webhook/value-objects/HttpMethod.ts

type ValidHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export class HttpMethod {
  private constructor(private readonly value: ValidHttpMethod) {}

  static fromString(method: string): HttpMethod {
    const normalized = method.toUpperCase();

    // TDD: test validates allowed methods
    if (!this.isValid(normalized)) {
      throw new Error(`Invalid HTTP method: ${method}`);
    }

    return new HttpMethod(normalized as ValidHttpMethod);
  }

  private static isValid(method: string): method is ValidHttpMethod {
    return ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].includes(method);
  }

  toString(): string {
    return this.value;
  }

  equals(other: HttpMethod): boolean {
    return this.value === other.value;
  }

  // Business rule helpers
  isIdempotent(): boolean {
    return ['GET', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'].includes(this.value);
  }

  isMutating(): boolean {
    return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(this.value);
  }
}
```

---

## 📝 Application Layer (Use Cases)

### Use Case: CreateEndpoint

```typescript
// src/application/use-cases/CreateEndpoint.ts

import { Endpoint } from '../../domain/endpoint/Endpoint';
import { IEndpointRepository } from '../../domain/endpoint/IEndpointRepository';
import { IEventPublisher } from '../../domain/shared/IEventPublisher';

export interface CreateEndpointCommand {
  name: string;
  description?: string;
  userId?: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
}

export interface CreateEndpointResult {
  endpointId: string;
  url: string;
  expiresAt: Date | null;
}

export class CreateEndpointUseCase {
  constructor(
    private readonly endpointRepository: IEndpointRepository,
    private readonly eventPublisher: IEventPublisher
  ) {}

  async execute(command: CreateEndpointCommand): Promise<CreateEndpointResult> {
    // TDD: test endpoint creation with valid data
    const endpoint = Endpoint.create({
      name: command.name,
      description: command.description,
      userId: command.userId,
      plan: command.plan,
    });

    // TDD: test repository saves endpoint
    await this.endpointRepository.save(endpoint);

    // TDD: test events are published
    const events = endpoint.getDomainEvents();
    for (const event of events) {
      await this.eventPublisher.publish(event);
    }

    endpoint.clearDomainEvents();

    return {
      endpointId: endpoint.getId().toString(),
      url: endpoint.getUrl().toString(),
      expiresAt: endpoint.getExpiresAt(),
    };
  }
}
```

### Use Case: ReceiveWebhook

```typescript
// src/application/use-cases/ReceiveWebhook.ts

import { WebhookRequest } from '../../domain/webhook/WebhookRequest';
import { EndpointId } from '../../domain/endpoint/value-objects/EndpointId';
import { IWebhookRequestRepository } from '../../domain/webhook/IWebhookRequestRepository';
import { IEndpointRepository } from '../../domain/endpoint/IEndpointRepository';
import { IForwardingService } from '../services/IForwardingService';
import { INotificationService } from '../services/INotificationService';

export interface ReceiveWebhookCommand {
  endpointId: string;
  method: string;
  headers: Record<string, string>;
  body: string;
  queryParams: Record<string, string>;
  sourceIp: string;
}

export interface ReceiveWebhookResult {
  statusCode: number;
  body: string;
  headers: Record<string, string>;
}

export class ReceiveWebhookUseCase {
  constructor(
    private readonly endpointRepository: IEndpointRepository,
    private readonly requestRepository: IWebhookRequestRepository,
    private readonly forwardingService: IForwardingService,
    private readonly notificationService: INotificationService
  ) {}

  async execute(command: ReceiveWebhookCommand): Promise<ReceiveWebhookResult> {
    // TDD: test endpoint exists
    const endpointId = EndpointId.fromString(command.endpointId);
    const endpoint = await this.endpointRepository.findById(endpointId);

    if (!endpoint) {
      throw new Error('Endpoint not found');
    }

    // TDD: test endpoint not expired
    if (endpoint.isExpired()) {
      throw new Error('Endpoint has expired');
    }

    // TDD: test request creation
    const request = WebhookRequest.receive({
      endpointId,
      method: command.method,
      headers: command.headers,
      body: command.body,
      queryParams: command.queryParams,
      sourceIp: command.sourceIp,
    });

    // TDD: test request is saved
    await this.requestRepository.save(request);

    // TDD: test forwarding if enabled
    const forwardingConfig = endpoint.getForwardingConfig();
    if (forwardingConfig?.isEnabled()) {
      await this.forwardingService.forward(request, forwardingConfig);
    }

    // TDD: test notification is sent
    await this.notificationService.notifyNewRequest(endpointId, request);

    // TDD: test custom response is returned
    const customResponse = endpoint.getCustomResponse();
    return {
      statusCode: customResponse.getStatusCode(),
      body: customResponse.getBody(),
      headers: customResponse.getHeaders(),
    };
  }
}
```

---

## 🧪 Testing Strategy (TDD Approach)

### Test Pyramid

```
                    ┌─────────────┐
                    │     E2E     │  <-- 10% (Critical user flows)
                    │   Tests     │
                    └─────────────┘
                  ┌───────────────────┐
                  │   Integration     │  <-- 20% (Component interactions)
                  │      Tests        │
                  └───────────────────┘
              ┌─────────────────────────────┐
              │       Unit Tests            │  <-- 70% (Domain logic)
              │   (Domain, Use Cases)       │
              └─────────────────────────────┘
```

### Testing Levels

#### 1. Unit Tests (70% of tests)

**Domain Layer Tests:**

```typescript
// src/domain/endpoint/__tests__/Endpoint.test.ts

import { Endpoint } from '../Endpoint';
import { EndpointId } from '../value-objects/EndpointId';

describe('Endpoint', () => {
  describe('create', () => {
    it('should create endpoint with valid data', () => {
      // Arrange
      const params = {
        name: 'Test Endpoint',
        description: 'Testing webhooks',
        userId: 'user-123',
        plan: 'free' as const,
      };

      // Act
      const endpoint = Endpoint.create(params);

      // Assert
      expect(endpoint.getName()).toBe('Test Endpoint');
      expect(endpoint.getId()).toBeInstanceOf(EndpointId);
      expect(endpoint.isExpired()).toBe(false);
    });

    it('should create expired date for free plan', () => {
      // Arrange
      const params = {
        name: 'Free Endpoint',
        plan: 'free' as const,
      };

      // Act
      const endpoint = Endpoint.create(params);
      const expiresAt = endpoint.getExpiresAt();

      // Assert
      expect(expiresAt).not.toBeNull();
      expect(expiresAt!.getTime()).toBeGreaterThan(Date.now());
      expect(expiresAt!.getTime()).toBeLessThan(Date.now() + 25 * 60 * 60 * 1000);
    });

    it('should not create expired date for paid plans', () => {
      // Arrange
      const params = {
        name: 'Pro Endpoint',
        plan: 'pro' as const,
      };

      // Act
      const endpoint = Endpoint.create(params);

      // Assert
      expect(endpoint.getExpiresAt()).toBeNull();
    });
  });

  describe('configureResponse', () => {
    it('should configure custom response with valid data', () => {
      // Arrange
      const endpoint = Endpoint.create({ name: 'Test', plan: 'free' });

      // Act
      endpoint.configureResponse(201, '{"success": true}', {
        'Content-Type': 'application/json',
      });

      // Assert
      const response = endpoint.getCustomResponse();
      expect(response.getStatusCode()).toBe(201);
      expect(response.getBody()).toBe('{"success": true}');
      expect(response.getHeaders()['Content-Type']).toBe('application/json');
    });

    it('should throw error for invalid status code', () => {
      // Arrange
      const endpoint = Endpoint.create({ name: 'Test', plan: 'free' });

      // Act & Assert
      expect(() => {
        endpoint.configureResponse(999, '', {});
      }).toThrow('Invalid HTTP status code');
    });
  });

  describe('enableForwarding', () => {
    it('should enable forwarding with valid URL', () => {
      // Arrange
      const endpoint = Endpoint.create({ name: 'Test', plan: 'pro' });

      // Act
      endpoint.enableForwarding('https://example.com/webhook');

      // Assert
      const forwarding = endpoint.getForwardingConfig();
      expect(forwarding).not.toBeNull();
      expect(forwarding!.isEnabled()).toBe(true);
    });

    it('should throw error for invalid URL', () => {
      // Arrange
      const endpoint = Endpoint.create({ name: 'Test', plan: 'pro' });

      // Act & Assert
      expect(() => {
        endpoint.enableForwarding('not-a-url');
      }).toThrow('Invalid forwarding URL');
    });
  });

  describe('isExpired', () => {
    it('should return true when endpoint is expired', () => {
      // Arrange
      const endpoint = Endpoint.create({ name: 'Test', plan: 'free' });
      // Manually set expiry to past (using reflection or test helper)
      const pastDate = new Date(Date.now() - 1000);
      endpoint['expiresAt'] = pastDate;

      // Act
      const expired = endpoint.isExpired();

      // Assert
      expect(expired).toBe(true);
    });

    it('should return false when endpoint has no expiry', () => {
      // Arrange
      const endpoint = Endpoint.create({ name: 'Test', plan: 'pro' });

      // Act
      const expired = endpoint.isExpired();

      // Assert
      expect(expired).toBe(false);
    });
  });
});
```

**Value Object Tests:**

```typescript
// src/domain/endpoint/value-objects/__tests__/EndpointId.test.ts

import { EndpointId } from '../EndpointId';

describe('EndpointId', () => {
  describe('generate', () => {
    it('should generate valid UUID', () => {
      // Act
      const id = EndpointId.generate();

      // Assert
      expect(id.toString()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it('should generate unique IDs', () => {
      // Act
      const id1 = EndpointId.generate();
      const id2 = EndpointId.generate();

      // Assert
      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('fromString', () => {
    it('should create EndpointId from valid UUID string', () => {
      // Arrange
      const uuid = '123e4567-e89b-4d3f-a456-426614174000';

      // Act
      const id = EndpointId.fromString(uuid);

      // Assert
      expect(id.toString()).toBe(uuid);
    });

    it('should throw error for invalid UUID format', () => {
      // Arrange
      const invalidUuid = 'not-a-uuid';

      // Act & Assert
      expect(() => {
        EndpointId.fromString(invalidUuid);
      }).toThrow('Invalid endpoint ID format');
    });
  });

  describe('equals', () => {
    it('should return true for same ID values', () => {
      // Arrange
      const uuid = '123e4567-e89b-4d3f-a456-426614174000';
      const id1 = EndpointId.fromString(uuid);
      const id2 = EndpointId.fromString(uuid);

      // Act & Assert
      expect(id1.equals(id2)).toBe(true);
    });

    it('should return false for different ID values', () => {
      // Arrange
      const id1 = EndpointId.generate();
      const id2 = EndpointId.generate();

      // Act & Assert
      expect(id1.equals(id2)).toBe(false);
    });
  });
});
```

---

#### 2. Integration Tests (20% of tests)

**Use Case Integration Tests:**

```typescript
// src/application/use-cases/__tests__/CreateEndpoint.integration.test.ts

import { CreateEndpointUseCase } from '../CreateEndpoint';
import { InMemoryEndpointRepository } from '../../../infrastructure/persistence/InMemoryEndpointRepository';
import { InMemoryEventPublisher } from '../../../infrastructure/events/InMemoryEventPublisher';

describe('CreateEndpointUseCase (Integration)', () => {
  let useCase: CreateEndpointUseCase;
  let repository: InMemoryEndpointRepository;
  let eventPublisher: InMemoryEventPublisher;

  beforeEach(() => {
    repository = new InMemoryEndpointRepository();
    eventPublisher = new InMemoryEventPublisher();
    useCase = new CreateEndpointUseCase(repository, eventPublisher);
  });

  it('should create endpoint and save to repository', async () => {
    // Arrange
    const command = {
      name: 'Test Endpoint',
      description: 'Integration test',
      userId: 'user-123',
      plan: 'free' as const,
    };

    // Act
    const result = await useCase.execute(command);

    // Assert
    expect(result.endpointId).toBeDefined();
    expect(result.url).toContain(result.endpointId);

    // Verify repository state
    const saved = await repository.findById(EndpointId.fromString(result.endpointId));
    expect(saved).not.toBeNull();
    expect(saved!.getName()).toBe('Test Endpoint');
  });

  it('should publish domain events', async () => {
    // Arrange
    const command = {
      name: 'Test Endpoint',
      plan: 'free' as const,
    };

    // Act
    await useCase.execute(command);

    // Assert
    const publishedEvents = eventPublisher.getPublishedEvents();
    expect(publishedEvents).toHaveLength(1);
    expect(publishedEvents[0].type).toBe('EndpointCreated');
  });
});
```

**Repository Integration Tests (with DynamoDB Local):**

```typescript
// src/infrastructure/persistence/__tests__/DynamoDBEndpointRepository.integration.test.ts

import { DynamoDBEndpointRepository } from '../DynamoDBEndpointRepository';
import { Endpoint } from '../../../domain/endpoint/Endpoint';
import { DynamoDB } from 'aws-sdk';

describe('DynamoDBEndpointRepository (Integration)', () => {
  let repository: DynamoDBEndpointRepository;
  let dynamodb: DynamoDB.DocumentClient;

  beforeAll(async () => {
    // Set up DynamoDB Local for testing
    dynamodb = new DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });

    repository = new DynamoDBEndpointRepository(dynamodb);

    // Create table
    await createTestTable();
  });

  afterAll(async () => {
    await deleteTestTable();
  });

  afterEach(async () => {
    await clearTestData();
  });

  it('should save and retrieve endpoint', async () => {
    // Arrange
    const endpoint = Endpoint.create({
      name: 'Test Endpoint',
      plan: 'free',
    });

    // Act
    await repository.save(endpoint);
    const retrieved = await repository.findById(endpoint.getId());

    // Assert
    expect(retrieved).not.toBeNull();
    expect(retrieved!.getId().equals(endpoint.getId())).toBe(true);
    expect(retrieved!.getName()).toBe('Test Endpoint');
  });

  it('should return null for non-existent endpoint', async () => {
    // Arrange
    const nonExistentId = EndpointId.generate();

    // Act
    const result = await repository.findById(nonExistentId);

    // Assert
    expect(result).toBeNull();
  });
});
```

---

#### 3. End-to-End Tests (10% of tests)

**Critical User Flow: Create Endpoint → Receive Webhook → View in Dashboard:**

```typescript
// e2e/__tests__/webhook-flow.e2e.test.ts

import { test, expect } from '@playwright/test';

test.describe('Webhook Flow E2E', () => {
  test('should create endpoint, receive webhook, and display in dashboard', async ({ page, request }) => {
    // 1. Visit landing page
    await page.goto('http://localhost:3000');

    // 2. Generate webhook URL
    await page.click('button:has-text("Generate Webhook URL")');

    // 3. Copy webhook URL
    const webhookUrl = await page.textContent('[data-testid="webhook-url"]');
    expect(webhookUrl).toContain('https://webhookhq.com/w/');

    // 4. Send webhook request
    const response = await request.post(webhookUrl!, {
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'test-value',
      },
      data: {
        event: 'test',
        data: { foo: 'bar' },
      },
    });

    expect(response.status()).toBe(200);

    // 5. Verify request appears in dashboard (wait for real-time update)
    await page.waitForSelector('[data-testid="request-list-item"]', { timeout: 5000 });

    const requestItem = page.locator('[data-testid="request-list-item"]').first();
    await expect(requestItem).toContainText('POST');
    await expect(requestItem).toContainText('200');

    // 6. Click request to view details
    await requestItem.click();

    // 7. Verify request details
    await expect(page.locator('[data-testid="request-body"]')).toContainText('"event": "test"');
    await expect(page.locator('[data-testid="request-headers"]')).toContainText('X-Custom-Header');

    // 8. Test replay functionality
    await page.click('button:has-text("Replay")');
    await page.fill('[data-testid="replay-url"]', 'https://httpbin.org/post');
    await page.click('button:has-text("Send Replay")');

    await expect(page.locator('[data-testid="replay-status"]')).toContainText('200 OK');
  });
});
```

---

## 🔨 Pragmatic Implementation Guidelines

### 1. Start Simple, Add Complexity When Needed

**Good (Pragmatic):**
```typescript
// Simple value object for MVP
class EndpointName {
  constructor(private readonly value: string) {
    if (!value || value.length > 100) {
      throw new Error('Invalid name');
    }
  }
  toString() { return this.value; }
}
```

**Over-engineered (Avoid):**
```typescript
// Too much ceremony for simple value
class EndpointName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): Result<EndpointName, ValidationError> {
    // Excessive validation framework...
  }

  protected validate() {
    // Complex validation chain...
  }
}
```

### 2. Use Plain Objects Where Appropriate

**Not everything needs to be a class:**

```typescript
// Good: Simple DTO
interface CreateEndpointDTO {
  name: string;
  description?: string;
  plan: string;
}

// Overkill: Class for simple data transfer
class CreateEndpointDTO {
  constructor(
    private readonly name: string,
    private readonly description: string | undefined,
    private readonly plan: string
  ) {}
  // Getters...
}
```

### 3. Test Behavior, Not Implementation

**Good (Behavior-focused):**
```typescript
it('should reject expired endpoints', async () => {
  const endpoint = createExpiredEndpoint();

  await expect(
    receiveWebhook(endpoint.getId(), requestData)
  ).rejects.toThrow('Endpoint has expired');
});
```

**Bad (Implementation-focused):**
```typescript
it('should call isExpired() method', async () => {
  const endpoint = createExpiredEndpoint();
  const spy = jest.spyOn(endpoint, 'isExpired');

  await receiveWebhook(endpoint.getId(), requestData);

  expect(spy).toHaveBeenCalled(); // Testing implementation detail
});
```

### 4. Repository Pattern (Pragmatic Approach)

**Interface (Domain Layer):**
```typescript
// src/domain/endpoint/IEndpointRepository.ts
export interface IEndpointRepository {
  save(endpoint: Endpoint): Promise<void>;
  findById(id: EndpointId): Promise<Endpoint | null>;
  findByUserId(userId: string): Promise<Endpoint[]>;
  delete(id: EndpointId): Promise<void>;
}
```

**In-Memory Implementation (Testing):**
```typescript
// src/infrastructure/persistence/InMemoryEndpointRepository.ts
export class InMemoryEndpointRepository implements IEndpointRepository {
  private endpoints = new Map<string, Endpoint>();

  async save(endpoint: Endpoint): Promise<void> {
    this.endpoints.set(endpoint.getId().toString(), endpoint);
  }

  async findById(id: EndpointId): Promise<Endpoint | null> {
    return this.endpoints.get(id.toString()) || null;
  }

  async findByUserId(userId: string): Promise<Endpoint[]> {
    return Array.from(this.endpoints.values())
      .filter(e => e.getUserId() === userId);
  }

  async delete(id: EndpointId): Promise<void> {
    this.endpoints.delete(id.toString());
  }
}
```

**DynamoDB Implementation (Production):**
```typescript
// src/infrastructure/persistence/DynamoDBEndpointRepository.ts
export class DynamoDBEndpointRepository implements IEndpointRepository {
  constructor(private readonly dynamodb: DynamoDB.DocumentClient) {}

  async save(endpoint: Endpoint): Promise<void> {
    await this.dynamodb.put({
      TableName: 'webhookhq-endpoints',
      Item: this.toDTO(endpoint),
    }).promise();
  }

  async findById(id: EndpointId): Promise<Endpoint | null> {
    const result = await this.dynamodb.get({
      TableName: 'webhookhq-endpoints',
      Key: { PK: `ENDPOINT#${id.toString()}`, SK: 'METADATA' },
    }).promise();

    return result.Item ? this.toDomain(result.Item) : null;
  }

  // ... other methods
}
```

---

## 📁 Project Structure

```
webhookhq/
├── src/
│   ├── domain/                          # Domain Layer (Pure business logic)
│   │   ├── endpoint/
│   │   │   ├── Endpoint.ts              # Aggregate Root
│   │   │   ├── IEndpointRepository.ts   # Repository Interface
│   │   │   ├── events/
│   │   │   │   ├── EndpointCreated.ts
│   │   │   │   └── EndpointConfigured.ts
│   │   │   ├── value-objects/
│   │   │   │   ├── EndpointId.ts
│   │   │   │   ├── EndpointUrl.ts
│   │   │   │   ├── CustomResponse.ts
│   │   │   │   └── ForwardingConfig.ts
│   │   │   └── __tests__/
│   │   │       ├── Endpoint.test.ts
│   │   │       └── value-objects/
│   │   ├── webhook/
│   │   │   ├── WebhookRequest.ts
│   │   │   ├── IWebhookRequestRepository.ts
│   │   │   ├── value-objects/
│   │   │   │   ├── RequestId.ts
│   │   │   │   ├── HttpMethod.ts
│   │   │   │   ├── RequestPayload.ts
│   │   │   │   └── RequestMetadata.ts
│   │   │   └── __tests__/
│   │   ├── user/
│   │   │   ├── User.ts
│   │   │   └── Subscription.ts
│   │   └── shared/
│   │       ├── DomainEvent.ts
│   │       ├── IEventPublisher.ts
│   │       └── Result.ts
│   │
│   ├── application/                     # Application Layer (Use Cases)
│   │   ├── use-cases/
│   │   │   ├── CreateEndpoint.ts
│   │   │   ├── ReceiveWebhook.ts
│   │   │   ├── ReplayRequest.ts
│   │   │   ├── ConfigureEndpoint.ts
│   │   │   └── __tests__/
│   │   │       ├── CreateEndpoint.test.ts
│   │   │       ├── CreateEndpoint.integration.test.ts
│   │   │       └── ReceiveWebhook.integration.test.ts
│   │   └── services/
│   │       ├── IForwardingService.ts
│   │       └── INotificationService.ts
│   │
│   ├── infrastructure/                  # Infrastructure Layer
│   │   ├── persistence/
│   │   │   ├── DynamoDBEndpointRepository.ts
│   │   │   ├── DynamoDBWebhookRequestRepository.ts
│   │   │   ├── InMemoryEndpointRepository.ts      # For testing
│   │   │   └── __tests__/
│   │   │       └── DynamoDBEndpointRepository.integration.test.ts
│   │   ├── events/
│   │   │   ├── RedisEventPublisher.ts
│   │   │   └── InMemoryEventPublisher.ts           # For testing
│   │   ├── services/
│   │   │   ├── HttpForwardingService.ts
│   │   │   └── WebSocketNotificationService.ts
│   │   └── lambda/
│   │       ├── webhook-receiver/
│   │       │   ├── handler.ts
│   │       │   └── __tests__/
│   │       ├── endpoint-manager/
│   │       │   ├── handler.ts
│   │       │   └── __tests__/
│   │       └── websocket-handler/
│   │
│   └── presentation/                    # Presentation Layer (Next.js)
│       ├── app/
│       │   ├── (dashboard)/
│       │   │   └── w/[id]/
│       │   │       ├── page.tsx
│       │   │       └── __tests__/
│       │   ├── api/
│       │   │   ├── endpoints/
│       │   │   └── requests/
│       │   └── page.tsx
│       └── components/
│           ├── webhook/
│           │   ├── RequestList.tsx
│           │   ├── RequestInspector.tsx
│           │   └── __tests__/
│           └── ui/
│
├── e2e/
│   └── __tests__/
│       ├── webhook-flow.e2e.test.ts
│       └── user-journey.e2e.test.ts
│
├── jest.config.js
├── jest.integration.config.js
├── playwright.config.ts
└── package.json
```

---

## ⚙️ Testing Configuration

### Jest Configuration (Unit & Integration)

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

### Integration Test Configuration

```javascript
// jest.integration.config.js
module.exports = {
  ...require('./jest.config'),
  testMatch: ['**/__tests__/**/*.integration.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup-integration.ts'],
  testTimeout: 30000, // Longer timeout for database operations
};
```

### Playwright Configuration (E2E)

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## 🚀 TDD Workflow

### Red-Green-Refactor Cycle

**Example: Implementing `HttpMethod` Value Object**

**Step 1: RED - Write failing test**
```typescript
// src/domain/webhook/value-objects/__tests__/HttpMethod.test.ts

describe('HttpMethod', () => {
  it('should create HttpMethod from valid string', () => {
    const method = HttpMethod.fromString('POST');
    expect(method.toString()).toBe('POST');
  });
});

// ❌ Test fails: HttpMethod not implemented
```

**Step 2: GREEN - Write minimal code to pass**
```typescript
// src/domain/webhook/value-objects/HttpMethod.ts

export class HttpMethod {
  constructor(private readonly value: string) {}

  static fromString(method: string): HttpMethod {
    return new HttpMethod(method.toUpperCase());
  }

  toString(): string {
    return this.value;
  }
}

// ✅ Test passes
```

**Step 3: Add more tests (RED again)**
```typescript
it('should throw error for invalid method', () => {
  expect(() => HttpMethod.fromString('INVALID'))
    .toThrow('Invalid HTTP method');
});

// ❌ Test fails: No validation
```

**Step 4: Implement validation (GREEN)**
```typescript
static fromString(method: string): HttpMethod {
  const normalized = method.toUpperCase();
  const valid = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

  if (!valid.includes(normalized)) {
    throw new Error(`Invalid HTTP method: ${method}`);
  }

  return new HttpMethod(normalized);
}

// ✅ All tests pass
```

**Step 5: REFACTOR - Improve code quality**
```typescript
type ValidHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export class HttpMethod {
  private constructor(private readonly value: ValidHttpMethod) {}

  static fromString(method: string): HttpMethod {
    const normalized = method.toUpperCase();

    if (!this.isValid(normalized)) {
      throw new Error(`Invalid HTTP method: ${method}`);
    }

    return new HttpMethod(normalized as ValidHttpMethod);
  }

  private static isValid(method: string): method is ValidHttpMethod {
    return ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].includes(method);
  }

  toString(): string {
    return this.value;
  }
}

// ✅ All tests still pass, code is cleaner
```

---

## 📋 Development Checklist (TDD/DDD)

### Week 1: Domain Layer + Unit Tests

**Day 1-2: Domain Models**
- [ ] Define bounded contexts
- [ ] Create Endpoint aggregate with tests
- [ ] Create EndpointId value object with tests
- [ ] Create CustomResponse value object with tests
- [ ] Create ForwardingConfig value object with tests
- [ ] All domain tests passing (target: 50+ tests)

**Day 3-4: Webhook Domain**
- [ ] Create WebhookRequest aggregate with tests
- [ ] Create HttpMethod value object with tests
- [ ] Create RequestPayload value object with tests
- [ ] Create RequestMetadata value object with tests
- [ ] All webhook tests passing (target: 40+ tests)

**Day 5: Repository Interfaces**
- [ ] Define IEndpointRepository interface
- [ ] Define IWebhookRequestRepository interface
- [ ] Create InMemory implementations for testing
- [ ] Repository tests passing

### Week 2: Application Layer + Integration Tests

**Day 6-7: Use Cases**
- [ ] Implement CreateEndpoint use case with tests
- [ ] Implement ReceiveWebhook use case with tests
- [ ] Implement ReplayRequest use case with tests
- [ ] Integration tests with in-memory repositories

**Day 8-9: Infrastructure**
- [ ] Implement DynamoDBEndpointRepository
- [ ] Integration tests with DynamoDB Local
- [ ] Implement RedisEventPublisher
- [ ] Implement HttpForwardingService with tests

**Day 10: Lambda Functions**
- [ ] Implement webhook-receiver Lambda with tests
- [ ] Implement endpoint-manager Lambda with tests
- [ ] Unit tests for Lambda handlers

### Week 3: Presentation Layer + E2E Tests

**Day 11-13: Frontend**
- [ ] Build webhook dashboard UI
- [ ] Component tests with React Testing Library
- [ ] API route handlers with tests

**Day 14-15: E2E Tests**
- [ ] Critical path: Create endpoint → Receive webhook → Display
- [ ] User registration and authentication flow
- [ ] Webhook replay flow
- [ ] Settings configuration flow

**Day 16-17: Integration & Polish**
- [ ] Run full test suite (unit + integration + e2e)
- [ ] Fix failing tests
- [ ] Achieve 80%+ coverage
- [ ] Performance testing

---

## ✅ Success Criteria

**Quality Metrics:**
- ✅ 80%+ code coverage (unit tests)
- ✅ All integration tests passing
- ✅ E2E tests covering critical paths
- ✅ Zero linting errors
- ✅ All TypeScript strict mode checks passing

**Architecture Compliance:**
- ✅ Domain layer has zero external dependencies
- ✅ All business rules in domain layer
- ✅ Repository pattern correctly implemented
- ✅ Use cases coordinate domain and infrastructure

**Development Process:**
- ✅ TDD followed for domain and application layers
- ✅ Tests written before implementation
- ✅ Red-Green-Refactor cycle documented
- ✅ Code reviews completed

---

## 🎯 Next Immediate Steps

1. **Set up testing infrastructure** (1 day)
   - Install Jest, Playwright
   - Configure test environments
   - Set up DynamoDB Local
   - Create test helpers

2. **Start with domain layer** (2-3 days)
   - TDD: Endpoint aggregate
   - TDD: Value objects
   - TDD: WebhookRequest aggregate
   - Achieve 100% domain coverage

3. **Build application layer** (2-3 days)
   - TDD: CreateEndpoint use case
   - TDD: ReceiveWebhook use case
   - Integration tests with in-memory repos

**Would you like me to:**
1. Set up the initial project with testing infrastructure?
2. Write the first domain model (Endpoint) with TDD approach?
3. Create test helper utilities and factories?
4. Set up CI/CD pipeline with automated testing?

Let's build WebhookHQ the right way! 🚀
