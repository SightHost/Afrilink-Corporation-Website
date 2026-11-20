# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Deploying to Cloudflare

The site is a static Astro build served by Cloudflare Workers (config in `wrangler.jsonc`).

- **From your machine:** `npx wrangler login` once, then `npm run deploy`.
- **From GitHub (auto-deploy on push):** Cloudflare dashboard → Workers & Pages → Create → Import a repository → pick this repo.
  Deploy command: `npx wrangler deploy` (it runs the build itself via `wrangler.jsonc`).

## Google Antigravity CLI

Install the `agy` CLI once on Windows with PowerShell:

```powershell
irm https://antigravity.google/cli/install.ps1 | iex
```

From the repository root, start an Antigravity session with:

```sh
npm run antigravity
```

The CLI starts in this project directory. On first launch, complete its setup and confirm that you trust the workspace. For other operating systems, see the [official installation guide](https://antigravity.google/docs/getting-started).
If `agy` is not recognized after installation, restart your terminal so it picks up the updated PATH.
