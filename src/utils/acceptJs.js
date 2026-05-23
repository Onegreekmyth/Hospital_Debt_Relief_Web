const ACCEPT_SCRIPT = {
  sandbox: "https://jstest.authorize.net/v1/Accept.js",
  production: "https://js.authorize.net/v1/Accept.js",
};

let scriptPromise = null;
let loadedSandbox = null;

/** Use sandbox Accept.js on local dev or when env says so (allows HTTP on localhost). */
export function shouldUseSandboxAcceptJs(apiSandboxFlag) {
  if (import.meta.env.VITE_AUTHORIZE_NET_SANDBOX === "true") return true;
  if (import.meta.env.VITE_AUTHORIZE_NET_SANDBOX === "false") return false;
  if (apiSandboxFlag === true) return true;
  if (apiSandboxFlag === false) return false;
  if (import.meta.env.DEV) return true;
  return false;
}

export function loadAcceptJs(sandbox) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Accept.js requires a browser"));
  }

  const useSandbox = shouldUseSandboxAcceptJs(sandbox);
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const isHttps = window.location.protocol === "https:";

  if (!useSandbox && !isHttps) {
    return Promise.reject(
      new Error(
        "A HTTPS connection is required for live payments. Deploy over HTTPS or enable sandbox mode for local testing."
      )
    );
  }

  if (!isHttps && !isLocalhost) {
    return Promise.reject(
      new Error(
        "Use http://localhost:5173 for local payment testing (not 127.0.0.1 or a LAN IP). For other hosts, use HTTPS."
      )
    );
  }

  if (window.Accept && loadedSandbox === useSandbox) {
    return Promise.resolve(window.Accept);
  }

  if (loadedSandbox !== useSandbox) {
    scriptPromise = null;
    document
      .querySelectorAll(
        'script[src*="authorize.net/v1/Accept.js"]'
      )
      .forEach((el) => el.remove());
    delete window.Accept;
    loadedSandbox = useSandbox;
  }

  if (!scriptPromise) {
    const src = useSandbox ? ACCEPT_SCRIPT.sandbox : ACCEPT_SCRIPT.production;
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener("load", () => resolve(window.Accept));
        existing.addEventListener("error", () =>
          reject(new Error("Failed to load Accept.js"))
        );
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve(window.Accept);
      script.onerror = () => reject(new Error("Failed to load Accept.js"));
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

/** Basic Luhn check — catches typos before Accept.js rejects the card. */
export function isValidCardNumber(number) {
  const digits = digitsOnly(number);
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function normalizeYear(year) {
  const y = digitsOnly(year);
  if (y.length === 2) return `20${y}`;
  if (y.length === 4) return y;
  return y;
}

export function tokenizeCard({ apiLoginId, clientKey, cardNumber, month, year, cardCode }) {
  return new Promise((resolve, reject) => {
    if (!window.Accept) {
      reject(new Error("Accept.js not loaded"));
      return;
    }

    if (!apiLoginId || !clientKey) {
      reject(new Error("Payment gateway is not configured (missing API login or client key)"));
      return;
    }

    const normalizedCard = digitsOnly(cardNumber);
    const normalizedMonth = digitsOnly(month);
    const normalizedYear = normalizeYear(year);
    const normalizedCvv = digitsOnly(cardCode);

    if (!isValidCardNumber(normalizedCard)) {
      reject(new Error("Please enter a valid card number."));
      return;
    }

    if (normalizedMonth.length < 1 || normalizedMonth.length > 2) {
      reject(new Error("Please enter a valid expiration month (01–12)."));
      return;
    }

    const monthNum = parseInt(normalizedMonth, 10);
    if (monthNum < 1 || monthNum > 12) {
      reject(new Error("Please enter a valid expiration month (01–12)."));
      return;
    }

    if (normalizedYear.length !== 4) {
      reject(new Error("Please enter a valid expiration year (e.g. 2030)."));
      return;
    }

    if (normalizedCvv.length < 3 || normalizedCvv.length > 4) {
      reject(new Error("Please enter a valid CVV (3 or 4 digits)."));
      return;
    }

    const authData = { clientKey, apiLoginID: String(apiLoginId).trim() };
    const cardData = {
      cardNumber: normalizedCard,
      month: String(monthNum).padStart(2, "0"),
      year: normalizedYear,
      cardCode: normalizedCvv,
    };

    window.Accept.dispatchData({ authData, cardData }, (response) => {
      if (response.messages.resultCode === "Error") {
        const msg =
          response.messages.message?.map((m) => m.text).join("; ") ||
          "Card tokenization failed";
        reject(new Error(msg));
        return;
      }
      resolve({
        dataDescriptor: response.opaqueData.dataDescriptor,
        dataValue: response.opaqueData.dataValue,
      });
    });
  });
}
