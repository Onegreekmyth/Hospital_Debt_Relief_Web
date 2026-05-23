/** Authorize.Net wordmark for payment modals (inline SVG — no external asset load). */
const AuthorizeNetLogo = ({ className = "w-full max-w-[168px] h-auto" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 280 64"
    role="img"
    aria-label="Authorize.Net, A Visa Solution"
  >
    <g fill="#F26522">
      <circle cx="18" cy="32" r="10" />
      <circle cx="28" cy="22" r="5" opacity="0.85" />
      <circle cx="28" cy="42" r="5" opacity="0.85" />
      <circle cx="8" cy="22" r="4" opacity="0.7" />
      <circle cx="8" cy="42" r="4" opacity="0.7" />
    </g>
    <text
      x="44"
      y="36"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="26"
      fontWeight="700"
      fill="#003366"
    >
      Authorize.Net
    </text>
    <text
      x="44"
      y="52"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="11"
      fill="#5c6b7a"
      letterSpacing="0.02em"
    >
      A Visa Solution
    </text>
  </svg>
);

export default AuthorizeNetLogo;
