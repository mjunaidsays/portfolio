/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHAT_WIDGET_BASE?: string;
  /** Full URL or root path (e.g. /widget.js) to widget.js if not served at `${BASE}/widget.js` */
  readonly VITE_CHAT_WIDGET_SCRIPT_URL?: string;
  /** Origin of the chat-window app (e.g. http://localhost:5174) when widget.js is hosted on this site */
  readonly VITE_CHAT_IFRAME_ORIGIN?: string;
  readonly VITE_CHAT_DEPLOYMENT_ID?: string;
  readonly VITE_CHAT_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
