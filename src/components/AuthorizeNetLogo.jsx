import authorizeNetLogo from "../assets/authorize.net-287x64.png";

const AuthorizeNetLogo = ({ className = "h-auto w-full max-w-[200px] object-contain" }) => (
  <img
    src={authorizeNetLogo}
    alt="Authorize.Net — A Visa Solution"
    className={className}
    width={287}
    height={64}
  />
);

export default AuthorizeNetLogo;
