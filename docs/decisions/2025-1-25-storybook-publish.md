# Publishing Storybook with Chromatic

- **Status:** Active
- **Last Modified:** 2025-01-25
- **Tags:** storybook, chromatic, publishing

## Context and Problem Statement

The team requires a solution to publish Storybook for review, collaboration, and continuous integration workflows. The solution must be easy to implement, support CI/CD pipelines, and facilitate collaboration among developers and stakeholders.

## Decision Drivers

- Ease of setup and integration with existing workflows
- Support for CI/CD automation
- Features for collaboration and version tracking
- Reliability and security
- Cost-effectiveness for the project needs

## Options Considered

- Chromatic
- Manual deployment to static hosting (e.g., Netlify, Vercel, GitHub Pages)
- Dedicated self-hosted solutions

## Decision Outcome

Chosen option: **"Chromatic"**, because it offers a seamless integration with Storybook, automates deployment, and provides advanced features like visual regression testing and version tracking, which are crucial for maintaining a consistent design system.

### Positive Consequences

- Simplifies deployment by directly integrating with Storybook without requiring additional infrastructure.
- Enables visual regression testing, improving design consistency.
- Facilitates collaboration by providing a hosted link for stakeholders to review.
- Streamlines CI/CD workflows with automated updates and pull request previews.

### Negative Consequences

- Dependency on a third-party service for publishing Storybook.
- Requires a subscription for accessing advanced features beyond the free tier.

## Pros and Cons of the Options

### Chromatic

Chromatic is a dedicated Storybook publishing and collaboration tool.

- **Pros**
  - Easy to set up with Storybook using a CLI tool.
  - Provides visual regression testing and version tracking.
  - Offers hosted links for stakeholders to review changes.
  - Integrates with CI/CD pipelines for automated deployments.
- **Cons**
  - Relies on a third-party service.
  - Subscription costs for advanced features beyond the free tier.

### Manual Deployment to Static Hosting

Deploying Storybook to platforms like Netlify, Vercel, or GitHub Pages.

- **Pros**
  - Cost-effective if using free tiers of hosting services.
  - Fully customizable deployment process.
- **Cons**
  - Requires additional setup and maintenance.
  - Lacks built-in visual regression testing or version tracking.
  - Limited collaboration features without external tools.

### Dedicated Self-Hosted Solutions

Hosting Storybook on internal infrastructure.

- **Pros**
  - Full control over hosting and data.
  - No dependency on third-party services.
- **Cons**
  - Significant setup and maintenance overhead.
  - No built-in features for visual regression testing or collaboration.
  - Higher infrastructure costs and resource requirements.

## Links

- [Storybook: Publish Storybook](https://storybook.js.org/docs/sharing/publish-storybook#)
