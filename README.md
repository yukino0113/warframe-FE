# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/42a9c31a-1c78-4a72-8d23-19d3f15ebb8a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/42a9c31a-1c78-4a72-8d23-19d3f15ebb8a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/42a9c31a-1c78-4a72-8d23-19d3f15ebb8a) and click on Share -> Publish.

### GitHub Pages

This project is GH Pages–ready. A workflow is included to build and deploy to the gh-pages branch.

- The site will be available at: https://<your-github-username>.github.io/warframe-FE/
- Asset base path: VITE_BASE_PATH=/warframe-FE/ is used so assets load correctly under the repo path.
- SPA routing: The workflow copies dist/index.html to dist/404.html so client-side routes work on refresh.
- API calls use a single fixed base: https://yukieevee-warframe.koyeb.app (GET /prime/status, POST /drop/search).

To enable:
1. Push to main. The workflow .github/workflows/deploy-gh-pages.yml will build and deploy automatically.
2. In your GitHub repo settings, go to Pages and set Source = GitHub Actions.

If your repository name changes, update VITE_BASE_PATH accordingly in the workflow.

#### Preventing white-screen regressions on GitHub Pages

White pages usually come from incorrect base path or routing config after a change. This repo includes guards:

- Build-time base tag in index.html: `<base href="%BASE_URL%" />` so assets resolve under the repo subpath.
- Router basename normalization in `src/utils/base.ts` used by `BrowserRouter`.
- CI verification workflow `.github/workflows/verify-gh-pages.yml` that builds with `VITE_BASE_PATH=/warframe-FE/` and runs `scripts/verify-gh-pages.mjs` to ensure `dist/index.html` contains the correct `<base>` and asset URLs.

Run locally before pushing:

```sh
# build with GH Pages base and verify
npm run build:pages && VITE_BASE_PATH=/warframe-FE/ npm run test:pages
```

If you rename the repository, change `/warframe-FE/` in:
- `.github/workflows/deploy-gh-pages.yml`
- `.github/workflows/verify-gh-pages.yml`
- `package.json` script `build:pages`
- Any docs/commands referencing the base path.

### Docker deployment (self-host)

This repo includes a Dockerfile to build and serve the app with Nginx, including a production proxy for API calls.

Build the image:

```sh
docker build -t warframe-FE .
# Optionally bake the API status URL at build time (used by the app when fetching prime status):
# docker build --build-arg VITE_STATUS_URL=https://yukieevee-warframe.koyeb.app/prime/status -t warframe-FE .
```

Run the container:

```sh
docker run -d --name warframe-fe -p 8080:80 warframe-FE
```

- The app will be available at http://localhost:8080
- The app calls the backend directly at https://yukieevee-warframe.koyeb.app (no internal proxy).

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
