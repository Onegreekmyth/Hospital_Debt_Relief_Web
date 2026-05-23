/** Digits-only card number for tokenization. */
export function cardDigitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

/** Display: groups of 4 (e.g. 4111 1111 1111 1111). */
export function formatCardNumberDisplay(value) {
  const digits = cardDigitsOnly(value).slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatExpMonthDisplay(value) {
  return cardDigitsOnly(value).slice(0, 2);
}

/** Two-digit year for display; Accept.js normalizes to 4 digits. */
export function formatExpYearDisplay(value) {
  return cardDigitsOnly(value).slice(0, 2);
}

export function formatCvvDisplay(value) {
  return cardDigitsOnly(value).slice(0, 4);
}
