// EmailJS Configuration
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_7edh3qg',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_n8kuxvk',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'w2JwDNW3V4NGOgU2J'
};

/** Strip `/widget.js` if pasted by mistake; script URL is always `${base}/widget.js`. */
function normalizeChatWidgetBase(raw: string): string {
  let u = raw.trim().replace(/\/$/, '');
  if (u.endsWith('/widget.js')) {
    u = u.slice(0, -'/widget.js'.length);
  }
  return u.replace(/\/$/, '') || 'http://localhost:3001';
}

/** Cogit-style embed: `data-base` points at your API; the script file may live elsewhere. */
export const chatWidgetConfig = {
  baseUrl: normalizeChatWidgetBase(
    import.meta.env.VITE_CHAT_WIDGET_BASE || 'http://localhost:3001'
  ),
  deploymentId:
    import.meta.env.VITE_CHAT_DEPLOYMENT_ID || 'cmnod4t5r000dsu26k3ewaeye',
  token:
    import.meta.env.VITE_CHAT_TOKEN ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6ImNtbTA1ODY3ODAwMDhmN25yY2E1dWczZW8iLCJpc3MiOiJjb2dpdCIsImlhdCI6MTc3NTAyNTEyM30.idOLVNuV9RDaE1ofhjhEbyHedBDdIXPneaMIV1MFcOo',
  /** Where the iframe loads the chat SPA (chat-window). Required if widget.js is same-origin as your site. */
  iframeOrigin: import.meta.env.VITE_CHAT_IFRAME_ORIGIN?.trim() || ''
};

/**
 * Where to load widget.js from.
 * - Set VITE_CHAT_WIDGET_SCRIPT_URL to a full URL, or a root path like `/widget.js` (file in `public/widget.js`).
 * - If unset, defaults to `${VITE_CHAT_WIDGET_BASE}/widget.js` (your API must serve that file).
 */
export function resolveChatWidgetScriptUrl(): string {
  const explicit = import.meta.env.VITE_CHAT_WIDGET_SCRIPT_URL?.trim();
  if (explicit) {
    if (/^https?:\/\//i.test(explicit)) {
      return explicit;
    }
    if (typeof window === 'undefined') {
      return explicit.startsWith('/') ? explicit : `/${explicit}`;
    }
    const path = explicit.startsWith('/') ? explicit : `/${explicit}`;
    return new URL(path, window.location.origin).href;
  }
  return `${chatWidgetConfig.baseUrl}/widget.js`;
}
