// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxthub/core"],

  hub: {
    // D1 Database - สร้างใน Cloudflare Dashboard → Workers & Pages → D1
    db: {
      dialect: "sqlite",
      driver: "d1",
      connection: { databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID || "" },
    },
    // KV Storage - สร้างใน Cloudflare Dashboard → Workers & Pages → KV
    kv: {
      driver: "cloudflare-kv-binding",
      namespaceId: process.env.CLOUDFLARE_KV_NAMESPACE_ID || "",
    },
    // Cache - สร้าง KV อีกตัวสำหรับ cache
    cache: {
      driver: "cloudflare-kv-binding",
      namespaceId: process.env.CLOUDFLARE_CACHE_NAMESPACE_ID || "",
    },
    // R2 Blob Storage - สร้างใน Cloudflare Dashboard → R2
    blob: {
      driver: "cloudflare-r2",
      binding: process.env.CLOUDFLARE_R2_BINDING || "",
      // bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME || "",
    },
  },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
