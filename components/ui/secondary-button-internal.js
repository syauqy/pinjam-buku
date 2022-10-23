import React from "react";
import Link from "next/link";
import clsx from "clsx";

export const SecondaryButtonInternal = React.forwardRef(
  (
    {
      className,
      children,
      href,
      rel,
      target,
      bgColor,
      hoverColor,
      path,
      variant,
      scroll,
      ...rest
    },
    ref
  ) => (
    <Link href={path} scroll={scroll}>
      <a
        rel="noopener noreferrer nofollow"
        className={clsx(
          " text-jala-dark-blue hover:bg-jala-dark-blue hover:text-white rounded-full py-3 px-5 border-2  hover:border-jala-dark-blue md:inline-flex items-center",
          className,
          bgColor,
          hoverColor,
          variant == "insight" ? "border-blue-500" : "",
          variant == "secondary" ? "border-blue-500 " : "",
          variant == "trade" ? " border-jala-trade" : "",
          variant == "farm" ? " border-jala-farm" : "",
          variant == "impact" ? "border-jala-impact" : ""
        )}
        {...rest}
      >
        {children}
      </a>
    </Link>
  )
);

SecondaryButtonInternal.displayName = "SecondaryButtonInternal";
