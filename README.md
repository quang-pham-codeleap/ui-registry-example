# JTL Component Library Sample

This repository is a sample application for the JTL component library distributed through the shadcn registry. It demonstrates how the library can be consumed in a real React application while keeping the developer experience close to the standard shadcn workflow.

The component library itself lives in the JTL Platform UI React branch here: [jtl-platform-ui-react/tree/agents/migrate-library-to-shadcn-registry](https://github.com/jtl-software/jtl-platform-ui-react/tree/agents/migrate-library-to-shadcn-registry).

## Why This Exists

The goal of this sample is to show that the JTL design system can be shipped and installed like any other shadcn registry package, without losing the structure and conventions that teams already expect from the shadcn ecosystem.

## JTL vs Shadcn

| Topic           | JTL component library                      | Shadcn UI                                             |
| --------------- | ------------------------------------------ | ----------------------------------------------------- |
| Distribution    | Published through the shadcn registry      | Installed from shadcn registry or added manually      |
| Design language | JTL-branded components and patterns        | Neutral starter primitives                            |
| Purpose         | Production-ready internal component system | Flexible base for building your own system            |
| Import style    | Consistent library-owned components        | Copy-into-project component model                     |
| Best fit        | Teams that want a shared UI standard       | Teams that want maximum control over component source |

## What You Can Explore

- JTL components imported from the registry
- Page-level examples that show how the system fits together
- Local conventions and compatibility notes for generated shadcn files

## Getting Started

Install dependencies and start the app with the usual Vite workflow:

```bash
pnpm install
pnpm dev
```

## GitHub Pages Deployment

The repository includes a GitHub Actions workflow that builds the app and deploys it to GitHub Pages on pushes to `main`.

To make the site available only to JTL Software GitHub accounts, set the Pages visibility in repository settings to the private/internal option available for your organization, then select `GitHub Actions` as the publish source.

## Notes

- This project intentionally includes both JTL components and standard shadcn-style components for comparison.
- Generated registry files may need small path corrections to match the import conventions used in this repository.
