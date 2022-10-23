import React from "react";
import Link from "next/link";
import clsx from "clsx";
// import ArrowSmRightIcon from "@heroicons/react/solid/ArrowSmRightIcon";

export const PrimaryButtonInternal = React.forwardRef(
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
          " hover:bg-white border-2 rounded-full py-3 px-5 text-white  inline-flex items-center",
          className,
          bgColor,
          hoverColor,
          variant == "insight"
            ? "bg-jala-primary border-jala-primary hover:text-jala-primary"
            : "",
          variant == "primary"
            ? "bg-jala-primary border-jala-primary hover:text-jala-primary"
            : "",
          variant == "trade"
            ? "bg-jala-trade border-jala-trade hover:text-jala-trade"
            : "",
          variant == "farm"
            ? "bg-jala-farm border-jala-farm hover:text-jala-farm"
            : "",
          variant == "impact"
            ? "bg-jala-impact border-jala-impact hover:text-jala-impact"
            : ""
        )}
        {...rest}
      >
        {children}
        {/* <ArrowSmRightIcon
          className={`
                  ml-2 h-4 w-4 `}
          aria-hidden="true"
        /> */}
      </a>
    </Link>
  )
);

PrimaryButtonInternal.displayName = "PrimaryButtonInternal";
