import { useEffect } from 'react';
import { chatWidgetConfig, resolveChatWidgetScriptUrl } from '../config';

const SCRIPT_ID = 'portfolio-chat-widget';

/**
 * Loads the chat widget script. `data-base` is your API.
 * Set VITE_CHAT_IFRAME_ORIGIN to the chat-window app when hosting widget.js on this site.
 */
export function ChatWidget() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) {
      return;
    }

    let cancelled = false;

    async function load() {
      const scriptUrl = resolveChatWidgetScriptUrl();
      const { baseUrl, deploymentId, token, iframeOrigin } = chatWidgetConfig;

      try {
        const parsed = new URL(scriptUrl);
        if (parsed.origin === window.location.origin) {
          const res = await fetch(scriptUrl);
          const text = await res.text();
          if (cancelled) return;
          if (!res.ok) {
            console.error('[ChatWidget] HTTP', res.status, 'for', scriptUrl);
            return;
          }
          const t = text.trimStart().toLowerCase();
          if (t.startsWith('<!doctype') || t.startsWith('<html')) {
            console.error(
              '[ChatWidget]',
              scriptUrl,
              'returned HTML (SPA fallback). Add the real Cogit widget as public/widget.js.'
            );
            return;
          }
        }
      } catch (e) {
        if (!cancelled) {
          console.error('[ChatWidget] Could not verify script URL', scriptUrl, e);
        }
        return;
      }

      if (cancelled) return;

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = scriptUrl;
      script.setAttribute('data-base', baseUrl);
      script.setAttribute('data-deployment-id', deploymentId);
      script.setAttribute('data-token', token);
      if (iframeOrigin) {
        script.setAttribute('data-iframe-origin', iframeOrigin);
      }
      script.onerror = () => {
        console.error(
          '[ChatWidget] Failed to load',
          script.src,
          '\nFix .env: only one VITE_CHAT_WIDGET_SCRIPT_URL line. Use /widget.js with public/widget.js, or a URL that returns real JavaScript.'
        );
      };
      document.body.appendChild(script);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
