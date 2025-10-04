// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    app: {
        head: {
            title: "Nuxt Fullstack Note App",
            link: [{ rel: "icon", type: "image/x-icon", href: "/fav.png" }],
            meta: [
                {
                    name: "description",
                    content:
                        "A fullstack note-taking application built with Nuxt.js",
                },
            ],
        },
    },

    runtimeConfig: {
        jwtSecret: process.env.JWT_SECRET,
    },

    modules: [
        "@nuxt/eslint",
        "motion-v/nuxt",
        "@nuxt/ui",
        "@nuxt/image",
        "@prisma/nuxt",
        "@vueuse/nuxt",
    ],
});
