import React from "react";
import Link from "next/link";
import clsx from "clsx";
import ArrowRightIcon from "@heroicons/react/solid/ArrowRightIcon";

export const ArrowButonInternal = React.forwardRef(
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
      locale,
      ...rest
    },
    ref
  ) => (
    <Link href={path} locale={locale}>
      <a
        className={clsx(
          " hover:bg-white border rounded-full  inline-flex items-center",
          className ? className : "py-3 px-3",
          bgColor,
          hoverColor,
          variant == "white"
            ? "border-jala-primary text-jala-primary hover:text-white hover:bg-jala-primary"
            : "",
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
        <ArrowRightIcon
          className={`
                      h-4 w-4 md:h-8 md:w-8 stroke-1`}
          aria-hidden="true"
        />
      </a>
    </Link>
  )
);

ArrowButonInternal.displayName = "ArrowButtonInternal";
