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
        " px-4 py-1 rounded-full",
        className,
        bgColor,
        hoverColor
      )}
      {...rest}
    >
      {children}
    </div>
  )
);

TagLabel.displayName = "TagLabel";
