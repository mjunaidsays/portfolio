/**
 * cogit Chat Widget Loader
 *
 * Supports two modes:
 * 1. Deployment-based (recommended): Uses data-base, data-deployment-id, data-token
 *    - Fetches configuration dynamically from backend
 * 2. Legacy: Uses all data attributes directly
 *    - Requires: data-token, data-agent-name, data-primary-color, data-font, etc.
 *
 * Optional: data-iframe-origin — base URL of the chat-window SPA (e.g. http://localhost:5174).
 * Use when widget.js is hosted on your marketing site but the iframe must load the chat app
 * from another origin (defaults to the script’s origin).
 */

const getDeploymentConfig = async () => {
  const base = document.currentScript.getAttribute('data-base');
  const deploymentId =
    document.currentScript.getAttribute('data-deployment-id');
  const token = document.currentScript.getAttribute('data-token');

  if (!base || !deploymentId || !token) {
    return null; // Fall back to legacy mode
  }

  try {
    const response = await fetch(
      `${base}/deployments/chat-widget-config?deploymentId=${deploymentId}&token=${token}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.status}`);
    }

    const config = await response.json();

    return {
      token,
      agentName: config.agentName,
      primaryColor: config.primaryColor,
      secondaryColor: config.secondaryColor,
      backgroundColor: config.backgroundColor,
      userPrimaryColor: config.userPrimaryColor,
      agentPrimaryColor: config.agentPrimaryColor,
      agentTextColor: config.agentTextColor,
      userTextColor: config.userTextColor,
      font: config.font,
      welcomeMessage: config.welcomeMessage,
      faqs: config.faqs
        .map((faq) => faq.trim())
        .filter(Boolean)
        .join(';'),
      placeholder: config.placeholder,
      position: config.position,
      autoOpen: String(config.autoOpen),
      width: config.width,
      height: config.height,
      deploymentId,
      faqsBackgroundColor: config.faqsBackgroundColor,
      faqsTipTextColor: config.faqsTipTextColor,
      inputBackgroundColor: config.inputBackgroundColor,
      inputTextColor: config.inputTextColor,
      inputPlaceholderColor: config.inputPlaceholderColor,
      inputSubmitButtonBackground: config.inputSubmitButtonBackground,
    };
  } catch (error) {
    console.error('cogit widget: failed to fetch deployment config', error);
    throw new Error('cogit widget: failed to fetch deployment config');
  }
};

const getLegacyConfig = () => {
  const token = document.currentScript.getAttribute('data-token');
  const agentName = document.currentScript.getAttribute('data-agent-name');
  const primaryColor =
    document.currentScript.getAttribute('data-primary-color');
  const secondaryColor = document.currentScript.getAttribute(
    'data-secondary-color',
  );
  const userPrimaryColor = document.currentScript.getAttribute(
    'data-user-primary-color',
  );
  const backgroundColor = document.currentScript.getAttribute(
    'data-background-color',
  );
  const agentPrimaryColor = document.currentScript.getAttribute(
    'data-agent-primary-color',
  );
  const agentTextColor = document.currentScript.getAttribute(
    'data-agent-text-color',
  );
  const userTextColor = document.currentScript.getAttribute(
    'data-user-text-color',
  );
  const font = document.currentScript.getAttribute('data-font');
  const welcomeMessage = document.currentScript.getAttribute(
    'data-welcome-message',
  );
  const faqs = document.currentScript.getAttribute('data-faqs');
  const placeholder = document.currentScript.getAttribute('data-placeholder');
  const position = document.currentScript.getAttribute('data-position');
  const autoOpen = document.currentScript.getAttribute('data-auto-open');
  const width = document.currentScript.getAttribute('data-width');
  const height = document.currentScript.getAttribute('data-height');

  if (!token || !(typeof token === 'string')) {
    throw new Error('cogit widget: data-token is required');
  }

  if (!agentName || !(typeof agentName === 'string')) {
    throw new Error('cogit widget: data-agent-name is required');
  }

  if (
    !primaryColor ||
    !(typeof primaryColor === 'string') ||
    !/^#[0-9a-f]{6}$/i.test(primaryColor)
  ) {
    throw new Error('cogit widget: data-primary-color is required');
  }

  if (
    !font ||
    !(typeof font === 'string') ||
    !['Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Inter'].includes(font)
  ) {
    throw new Error('cogit widget: data-font is required');
  }

  if (!welcomeMessage || !(typeof welcomeMessage === 'string')) {
    throw new Error('cogit widget: data-welcome-message is required');
  }

  if (!faqs || !(typeof faqs === 'string')) {
    throw new Error('cogit widget: data-faqs is required');
  }

  if (!placeholder || !(typeof placeholder === 'string')) {
    throw new Error('cogit widget: data-placeholder is required');
  }

  if (
    !position ||
    !(typeof position === 'string') ||
    !['bottom-left', 'bottom-right', 'BOTTOM_LEFT', 'BOTTOM_RIGHT'].includes(
      position,
    )
  ) {
    throw new Error('cogit widget: data-position is required');
  }

  if (
    !autoOpen ||
    !(typeof autoOpen === 'string') ||
    !['true', 'false'].includes(autoOpen)
  ) {
    throw new Error('cogit widget: data-auto-open is required');
  }

  return {
    token,
    agentName,
    primaryColor,
    secondaryColor: secondaryColor || '#ffffff',
    backgroundColor: backgroundColor || '#080808',
    userPrimaryColor: userPrimaryColor || primaryColor,
    agentPrimaryColor: agentPrimaryColor || primaryColor,
    agentTextColor: agentTextColor || '#ffffff',
    userTextColor: userTextColor || '#ffffff',
    font,
    welcomeMessage,
    faqs,
    placeholder,
    position,
    autoOpen,
    width: width || '384',
    height: height || '600',
  };
};

const getIFrameSrc = (
  currentScriptSrc,
  {
    token,
    agentName,
    primaryColor,
    secondaryColor,
    backgroundColor,
    userPrimaryColor,
    agentPrimaryColor,
    agentTextColor,
    userTextColor,
    font,
    welcomeMessage,
    faqs,
    placeholder,
    position,
    autoOpen,
    width,
    height,
    deploymentId,
    faqsBackgroundColor,
    faqsTipTextColor,
    inputBackgroundColor,
    inputTextColor,
    inputPlaceholderColor,
    inputSubmitButtonBackground,
  },
  iframeOriginOverride,
) => {
  let pageOrigin;
  if (iframeOriginOverride && String(iframeOriginOverride).trim()) {
    try {
      pageOrigin = new URL(String(iframeOriginOverride).trim()).origin;
    } catch {
      pageOrigin = new URL('', currentScriptSrc).origin;
    }
  } else {
    pageOrigin = new URL('', currentScriptSrc).origin;
  }
  const searchParams = new URLSearchParams();

  searchParams.set('token', token);
  searchParams.set('agentName', agentName);
  searchParams.set('primaryColor', primaryColor);
  searchParams.set('secondaryColor', secondaryColor);
  searchParams.set('backgroundColor', backgroundColor);
  searchParams.set('userPrimaryColor', userPrimaryColor);
  searchParams.set('agentPrimaryColor', agentPrimaryColor);
  searchParams.set('agentTextColor', agentTextColor);
  searchParams.set('userTextColor', userTextColor);
  searchParams.set('font', font);
  searchParams.set('welcomeMessage', welcomeMessage);
  searchParams.set('faqs', faqs);
  searchParams.set('placeholder', placeholder);
  searchParams.set('position', position);
  searchParams.set('autoOpen', autoOpen);
  searchParams.set('width', width);
  searchParams.set('height', height);
  searchParams.set('deploymentId', deploymentId);
  if (deploymentId != null && deploymentId !== '') {
    searchParams.set('deployment_id', deploymentId);
  }
  searchParams.set('faqsBackgroundColor', faqsBackgroundColor);
  searchParams.set('faqsTipTextColor', faqsTipTextColor);
  searchParams.set('inputBackgroundColor', inputBackgroundColor);
  searchParams.set('inputTextColor', inputTextColor);
  searchParams.set('inputPlaceholderColor', inputPlaceholderColor);
  searchParams.set('inputSubmitButtonBackground', inputSubmitButtonBackground);

  return `${pageOrigin}/?${searchParams}`;
};

const handleResizing = (iframe) => {
  window.addEventListener('message', (event) => {
    switch (event.data.type) {
      case 'init':
        iframe.style.width = `${event.data.width}px`;
        iframe.style.height = `${event.data.height}px`;
        break;

      case 'start_resize':
        iframe.style.width = '100vw';
        iframe.style.height = '100vh';
        break;

      case 'finish_resize':
        iframe.style.width = `${event.data.width}px`;
        iframe.style.height = `${event.data.height}px`;
        break;
    }
  });
};

const normalizePosition = (position) => {
  // Normalize position values from backend (BOTTOM_LEFT/BOTTOM_RIGHT)
  // to widget format (bottom-left/bottom-right)
  if (position === 'BOTTOM_LEFT') return 'bottom-left';
  if (position === 'BOTTOM_RIGHT') return 'bottom-right';
  return position;
};

(async () => {
  try {
    const scriptEl = document.currentScript;
    const currentScriptSrc = scriptEl.src;
    const iframeOriginOverride = scriptEl.getAttribute('data-iframe-origin');

    // Try deployment-based config first, fall back to legacy
    let config = await getDeploymentConfig();

    if (!config) {
      config = getLegacyConfig();
    }

    const normalizedPosition = normalizePosition(config.position);
    const iframe = document.createElement('iframe');

    iframe.src = getIFrameSrc(
      currentScriptSrc,
      {
        ...config,
        position: normalizedPosition,
      },
      iframeOriginOverride,
    );
    iframe.allow = 'clipboard-write';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '24px';
    iframe.style.width = `${Number(config.width) || 384}px`;
    iframe.style.height = `${Number(config.height) || 600}px`;
    iframe.style.border = 'none';
    iframe.style.outline = 'none';
    iframe.style.zIndex = '9999';

    switch (normalizedPosition) {
      case 'bottom-left':
        iframe.style.left = '24px';
        break;

      case 'bottom-right':
        iframe.style.right = '24px';
        break;
    }

    // Append immediately if document is ready, otherwise wait for load
    if (
      document.readyState === 'complete' ||
      document.readyState === 'interactive'
    ) {
      document.body.appendChild(iframe);
    } else {
      window.addEventListener('load', () => {
        document.body.appendChild(iframe);
      });
    }

    handleResizing(iframe);
  } catch (error) {
    console.error('cogit widget:', error);
    throw error;
  }
})();
