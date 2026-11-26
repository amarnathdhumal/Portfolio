import { access, rm, writeFile } from "node:fs/promises";

const workerOutput = new URL("../.open-next/", import.meta.url);
const generatedEnvModule = new URL("cloudflare/next-env.mjs", workerOutput);

// OpenNext copies local .env values into the Worker by default. Use runtime bindings instead.
await access(generatedEnvModule);
await writeFile(generatedEnvModule, [
    "export const production = {};",
    "export const development = {};",
    "export const test = {};",
    "",
].join("\n"));

await Promise.all([
    rm(new URL("server-functions/default/.env", workerOutput), { force: true }),
    rm(new URL("server-functions/default/.env.production", workerOutput), { force: true }),
]);
