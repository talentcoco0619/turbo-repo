# turbo-repo


Coding Assignment (Monorepo Microservice for E-Commerce)

Scenario:

You are working on an e-commerce platform using a monorepo structure. The repository contains two main apps: 
    ● Store Dashboard: For managing products, orders, and customer interactions (Next.js). 
    ● Store: The customer-facing service (Next.js).

You need to create a simple microservice that:
Handles product inventory updates across both the store and the dashboard.
The service should interact with a Postgres database using DB Queries or any ORM of your choice (Drizzle and Prisma preferred).
The service should expose a REST API to: ○ Update inventory when an order is placed. ○ Fetch inventory details for the store front.
Task:

Set up a basic microservice using TypeScript, and Prisma that:
○ Receives a POST request to update inventory when a product is purchased. ○ Receives a GET request to return the current inventory of a product.
Assume the database structure is as follows: 
○ products table: 
    ■ id (uuid, primary key) 
    ■ name (varchar) 
    ■ inventory_count (integer)
Upload this task in a git repository and share the same on

Key Constraints: 
    ● Implement efficient error handling, particularly for cases where inventory updates would fail (e.g., inventory count going negative). 
    ● Please don’t add any kind of authentication, just a simple counter on store for the current inventory and an input on the dashboard side. 
    ● Show how the microservice would be integrated into a Turbo monorepo with both dashboard and store running simultaneously. 
    ● You are not expected to create a user interface neither you’d be judged on it, however, it would be good for presentation purposes.
