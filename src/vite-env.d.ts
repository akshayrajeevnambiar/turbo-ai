/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_ENABLE_ANALYTICS: string;
    readonly VITE_GA_MEASUREMENT_ID: string;
    readonly VITE_ENABLE_PWA: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
