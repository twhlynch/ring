# webring

Webring powered by a cloudflare worker. Each site links to `/left` and `/right` for navigation by request origin.

To join, add your site to the list with a PR, and add the links to your site.

# dev

`npm run dev` to test locally.

`npm run deploy` to redeploy.

Run `wrangler types` to generate `worker-configuration.d.ts` for types completion.
