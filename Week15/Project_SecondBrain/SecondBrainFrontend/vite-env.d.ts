// /// <reference types="vite/client" />

// interface ImportMetaEnv {
//   readonly VITE_BASEURL: string; 
//    readonly VITE_API_KEY:"http://localhost:3000";
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASEURL: string; // 👈 your custom env variable
  // add more here if needed, e.g.
  // readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
