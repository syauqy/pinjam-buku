import React, { forwardRef } from "react";
import clsx from "clsx";

export const FooterLink = forwardRef(
  (
    { className, children, href, rel, target, bgColor, hoverColor, ...rest },
    ref
  ) => (
    <>
      {" "}
      <a
        className={clsx("hover:opacity-70", className, bgColor, hoverColor)}
        ref={ref}
        href={href}
        rel="nofollow noopener noreferrer"
        target="_blank"
        {...rest}
      >
        {children}
      </a>
    </>
  )
);

FooterLink.displayName = "FooterLink";
