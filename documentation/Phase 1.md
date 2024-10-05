Great! Let's dive into **Phase 1**, which involves setting up the foundations for the project. Here's a breakdown of the tasks:

---

### **Phase 1: Setting Up the Foundations**

#### **Step 1: DynamoDB Setup (AWS)**

1. **Create a DynamoDB Table for User Registration Data:**

   - **Table Name**: `Users`
   - **Primary Key**: `userId` (string)
   - **Attributes**:
     - `userId` (Partition key, unique identifier)
     - `email` (string)
     - `fullName` (string)
     - `isApproved` (boolean, defaults to `false`)
     - `isBusiness` (boolean, to track if the user is a business or individual)
     - `createdAt` (timestamp)

   **Actions**:

   - Go to the AWS Management Console → DynamoDB → Create Table.
   - Set up the attributes as defined above.

2. **Provision Read/Write Capacity (Auto-Scaling)**:
   - Enable auto-scaling for read and write operations based on your usage patterns.

---

#### **Step 2: AWS Lambda Functions**

We'll create two Lambda functions for handling user registration and login.

1. **Lambda 1: `RegisterUserFunction`**

   - **Purpose**: To register a new user and store their data in DynamoDB.
   - **Input**: JSON payload with `email`, `fullName`, and `isBusiness`.
   - **Logic**:
     - Validate the incoming data.
     - Check if the user already exists by querying DynamoDB.
     - If the user doesn't exist, create a new entry with `isApproved = false`.
   - **Response**: Return success/failure message.

2. **Lambda 2: `LoginUserFunction`**
   - **Purpose**: To authenticate a user and issue a JWT.
   - **Input**: `email`, `password` (if needed for future use).
   - **Logic**:
     - Query DynamoDB for the user by `email`.
     - If found and valid, return a JWT with user information.
   - **Response**: Return a JWT and user information for the Angular app to store.

---

#### **Step 3: API Gateway Setup**

1. **Create a REST API Gateway**:
   - **Endpoints**:
     - `/register`: POST method → triggers `RegisterUserFunction`.
     - `/login`: POST method → triggers `LoginUserFunction`.
   - **Security**: You can leave it open for now or use IAM roles for API protection. Later, JWT-based security will be added.

---

#### **Step 4: Initialize Angular Frontend**

1. **Set up Angular Project**:
   - Run `ng new Point3OrLess` to create the base Angular project.
   - Set up routing when prompted.
2. **Install Dependencies**:
   - JWT handling: `npm install @auth0/angular-jwt`
   - HTTP requests: `npm install @angular/common/http`
3. **Create Services**:

   - **`auth.service.ts`**: To handle API calls to the backend for registration and login.

     ```typescript
     import { HttpClient } from "@angular/common/http";
     import { Injectable } from "@angular/core";
     import { Observable } from "rxjs";

     @Injectable({
       providedIn: "root",
     })
     export class AuthService {
       private apiUrl = "https://api.yourdomain.com"; // Replace with your API Gateway URL

       constructor(private http: HttpClient) {}

       registerUser(data: any): Observable<any> {
         return this.http.post(`${this.apiUrl}/register`, data);
       }

       loginUser(credentials: any): Observable<any> {
         return this.http.post(`${this.apiUrl}/login`, credentials);
       }
     }
     ```

4. **Create Components**:
   - **RegistrationComponent** and **LoginComponent**.
   - Both components will use the `AuthService` to communicate with the AWS Lambda API.

---

### **Next Steps for Phase 1**

Here’s what you should start with:

1. **Set up DynamoDB**: Create the `Users` table.
2. **Write Lambda Functions**: Start with `RegisterUserFunction` and `LoginUserFunction`.
3. **Configure API Gateway**: Create REST endpoints for user registration and login.
4. **Start Angular Development**: Set up the Angular project and create services and basic components for user registration and login.

---

Once these are done, we can move to Phase 2, where we integrate JWT authentication and handle user session management. Let me know where you’d like to start or if you need any further assistance!
