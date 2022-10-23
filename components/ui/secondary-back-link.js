import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const SecondaryBackLink = React.forwardRef(
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
      ...rest
    },
    ref
  ) => (
    <Link href={path}>
      <a
        rel="noopener noreferrer nofollow"
        className={clsx(
          "py-3 hover:underline hover:underline-offset-4 inline-flex items-center",
          className,
          bgColor,
          hoverColor,
          variant == "insight" ? "text-blue-500" : "",
          variant == "secondary" ? "text-blue-500 " : "",
          variant == "trade" ? " text-jala-trade" : "",
          variant == "farm" ? " text-jala-farm" : "",
          variant == "impact" ? "text-jala-impact" : "",
          variant == "normal" ? " text-jala-gray" : ""
        )}
        {...rest}
      >
        <ArrowLeftIcon
          className={`
                  mr-2 h-4 w-4 `}
          aria-hidden="true"
        />
        {children}
      </a>
    </Link>
  )
);

SecondaryBackLink.displayName = "SecondaryBackLink";
