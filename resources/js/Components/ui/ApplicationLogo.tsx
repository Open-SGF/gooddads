import React from "react";

import HorizontalBlackLogo from "../public/logos/horizontal-black-logo.png";
import HorizontalWhiteLogo from "../public/logos/horizontal-white-logo.png";
import VerticalBlackLogo from "../public/logos/vertical-black-logo.png";
import VerticalWhiteLogo from "../public/logos/vertical-white-logo.png";
import SquareLogo from "../public/logos/square-logo.png";

type LogoVariant = "horizontal-black" | "horizontal-white" | "vertical-black" | "vertical-white" | "square";

interface ApplicationLogoProps {
    variant?: LogoVariant;
    size?: number;
  }

  const ApplicationLogo: React.FC<ApplicationLogoProps> = ({ variant = "horizontal-black", size = 200 }) => {
    const logos: Record<LogoVariant, string> = {
    "horizontal-black": HorizontalBlackLogo,
    "horizontal-white": HorizontalWhiteLogo,
    "vertical-black": VerticalBlackLogo,
    "vertical-white": VerticalWhiteLogo,
    "square": SquareLogo,
  };

  const selectedLogo = logos[variant];

  return (
    <img
      src={selectedLogo}
      alt={`${variant} logo`}
      style={{ width: `${size}px`, height: "auto" }} // Dynamically set width
    />
  );
};

export default ApplicationLogo;
