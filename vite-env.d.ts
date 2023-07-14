/// <referencetypes="vite/client" />
import "vite/client";

interface ImportMetaEnv {
  readonly VITE_AUTH0_AUTHORITY: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
