import React from "react";
import clsx from "clsx";

export const TagLabel = React.forwardRef(
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
    <div
      className={clsx(
        "bg-jala-insight-button px-4 py-2 rounded-full",
        className,
        bgColor,
        hoverColor,
        variant == "primary" ? "bg-jala-insight-button text-jala-insight" : "",
        variant == "insight" ? "bg-jala-insight-button text-jala-insight" : "",
        variant == "trade" ? "bg-jala-trade-button text-jala-trade" : "",
        variant == "farm" ? "bg-jala-farm-button text-jala-farm" : "",
        variant == "impact" ? "bg-jala-impact-button text-jala-impact" : ""
      )}
      {...rest}
    >
      {children}
    </div>
  )
);

TagLabel.displayName = "TagLabel";
