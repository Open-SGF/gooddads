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

- Frontend
  - Language: Typescript
  - Framework: React
  - Meta Framework: None
  - Styling: Tailwind
- Data Fetching: Inertia
- Backend
 - Framework: Lavel (PHP)
 - Database: MySQL

This represents a lot of what was preferred in the survey with a few exceptions.
Specifically using Tailwind over Vanilla CSS, MySQL over Postgres, and Inertia over REST.
Below is an explanation for each of these changes.

### Tailwind
Having a bit more structure in place over Vanilla CSS felt like it could help the team be more productive in writing styles.
There's also already some amount of styling done in the existing application that we don't need to throwaway.

### MySQL
This feels like a more natural option when using Laravel than Postgers.
Many packages in the Laravel ecosystem tend to prefer MySQL over Postgres or at least are more battle tested in MySQL.

### Inertia
This is an item we went back and forth on and could have gone either way.
Ultimately it felt like the cohesiveness of inertia outweighed the potential drawbacks and there were things that we could do to mitigate some of those drawbacks.

Specifically:
- Using a package to generate Typescript types for Request/Response classes in Laravel so that we have some level of type safety in our frontend code
- Ensuring that we minimize the logic in controllers so that it's easy for someone new to Laravel to trace a route to a component.
  - This likely looks like most logic being encapsulated into service classes that are injected into the controller
  - Ideally this results in most controller actions being 2-3 lines of code each


### Positive Consequences

- This represents what most of the current volunteers are familiar with
- All of these tools have large communities behind them including a large amount of learning resources
- Tight integration of frontend and backend into a single monolith

### Negative Consequences

- We wouldn't be using any of the existing seeding/migration scripts for the database
  - Not entirely a bad thing as Laravel provides systems for managing these that we'd want to port things to regardless of the database we use
- We may end up duplicating some backend work when building out an API to support the mobile app
- A new developer will need to be able to spin up a Laravel environment when working on the project
  - This includes pure frontend changes
  - However, this is mitigated somewhat by [Laravel Sail](https://laravel.com/docs/11.x/sail)

## Pros and Cons of the Options

Listing out pros and cons for all options would require a lot of expertise and time without necessarily providing a lot of value.
This section is intentionally left blank because of that.
