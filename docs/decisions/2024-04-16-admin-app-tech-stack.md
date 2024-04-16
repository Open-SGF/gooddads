# Admin App Tech Stack

- **Status:** Active
- **Last Modified:** 2024-04-16

## Context and Problem Statement

In order to build an app, we need to decide what stack to build it in.
For the time being we're focusing on the tech stack for the Admin app as we don't have requirements for the mobile Dad's experience app.
Of course, the mobile app decisions shouldn't entirely ignored as the backend decisions we make will affect that.

## Decision Drivers

- The final decision should represent a stack that is
  - Easy to learn
  - Allows the team to be effecient and productive
- The final decsion should take into consideration the results of the survey sent to volunteers
  - https://docs.google.com/spreadsheets/d/1B_EYl570J-7I2Ak8_A6TYa7UGizQFUztNpv0Q23k_98/edit?usp=sharing

## Options Considered

- Frontend
  - Language
    - Typescript
    - Javascript
  - Framework
    - React
    - Vue
    - Angular
    - Svelte
    - SolidJS
    - HTMX
  - Meta Framework
    - React
      - Next.js
      - Remix
      - None
    - Vue
      - Nuxt
      - None
    - Angular
      - Analog
      - None
    - Svelte
      - SvelteKit
      - None
  - Styling
    - Tailwind
    - Material UI
    - Bootstrap
    - Vanilaa CSS/SASS
- Data Fetching
  - REST
  - GraphQL
  - tRPC
  - Inertia
  - Firestore
  - Prisma, Drizzle, Supabase
- Backend
  - Framework
    - Spring Boot (Java)
    - Laravel (PHP)
    - ASP.NET Core (C#)
    - Nest.js (Typescript)
    - Express/Fastify/Koa (TypeScript)
    - Rails (Ruby)
    - Django (Python)
    - FastAPI (Python)
    - Flask (Python)
    - Vapor
    - Next.js
  - Database
    - MySQl
    - Postgres
    - MongoDB
    - SQLite
    - Raw files
    - Firebase
    - MS SQL

## Decision Outcome

For the most part, the following represents the most picked options for each category with one exception.

- Frontend
  - Language: Typescript
  - Framework: React
  - Meta Framework: Next.js
  - Styling: Vanilla CSS/SASS
- Data Fetching: REST
- Backend
 - Framework: Lavel (PHP)
 - Database: MySQL

There was a tie in the backend portion of the survey for Framework.
Laravel was picked due to it's ease of getting started and wide array of tutorials.
The database was changed to MySQL as that is a much more common option when using Laravel.

### Positive Consequences

- This represents what most of the current volunteers are familiar with
- All of these tools have large communities behind them including a large amount of learning resources
- Sticking with React and Next.js means that we don't have to throw all existing code away.
- Selecting REST as the data fetching format lends itself well to a future mobile app

### Negative Consequences

- Using Vanilla CSS/SASS without a component library could slow us down
- We wouldn't be using any of the existing seeding/migration scripts for the database
  - Not entirely a bad thing as Laravel provides systems for managing these that we'd want to port things to regardless of the database we use

## Pros and Cons of the Options

Listing out pros and cons for all options would require a lot of expertise and time without necessarily providing a lot of value.
This section is intentionally left blank because of that.
