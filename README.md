# Portfolio

A modern portfolio built with Next.js.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/amarnathdhumal/Portfolio
cd Portfolio
```

Install dependencies:

```bash
bun install
```

Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

To test PostHog with `bun run dev`, set `NEXT_PUBLIC_POSTHOG_IN_DEV=true` in `.env.local`.

## Deploy to Cloudflare Workers

Use Node.js 22.12 or newer and Bun. From the project root, preview the production build in the Workers runtime with `bun run preview`.

To deploy from your machine, sign in with Wrangler and run the deploy script.

```bash
bunx wrangler login
bun run deploy
```

For automatic deployments, import the repository in **Workers & Pages → Create application → GitHub**. Use `amarn-portfolio` as the Worker name and the repository root as the build directory. Leave **Build command** empty and set **Deploy command** to `bun run deploy`, which builds and deploys the Worker. [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)

### Environment variables

| Variable | Where to set it | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_POSTHOG_KEY` | Build variables | Optional PostHog project key. For local builds, put it in `.env.local` before running the build. |
| `GITHUB_TOKEN` | Worker runtime secret | Optional token for loading public GitHub sponsors. The page displays placeholders without it. |
| `CONTACT_FORM_FROM_EMAIL` | Worker runtime variable | Sender address on a domain onboarded to Cloudflare Email Service. |
| `CONTACT_FORM_DESTINATION_EMAIL` | Worker runtime variable | Inbox that receives contact form submissions. |

Set runtime values under **Settings → Variables and Secrets** on the Worker. Use `.env.local` with `bun run dev` and `.dev.vars` with `bun run preview` for local runtime values. Use the spelling `GITHUB_TOKEN` in your local file and in Cloudflare. `bun run build:cloudflare` clears local `.env` values from the generated Worker environment module before preview or deployment.

To enable contact emails, onboard your sender domain under **Compute → Email Service → Email Sending**. On Workers Free, verify the destination inbox under **Email Routing → Destination Addresses**. Wrangler configures the `CONTACT_EMAIL` binding, and no SMTP password is required. [Cloudflare Email Service setup](https://developers.cloudflare.com/email-service/get-started/send-emails/)

After testing the `workers.dev` URL, switch `www.amarn.me` by adding it as a custom domain under **Settings → Domains & Routes**. If `www` has a CNAME pointing to Vercel, remove that record during the switch so Cloudflare can create the Worker’s DNS record. [Cloudflare custom domain setup](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

---

## ⭐ Please Star This Repository

If you find this project helpful or interesting, please consider giving it a star! ⭐

It helps support the project and lets others discover it too. Thank you! 🙏

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
