import * as React from "react";

import clsx from "clsx";

export const ContainerLayout = React.forwardRef(
  ({ className, children, ...rest }, ref) => {
    return (
      <div className={clsx("w-full mx-auto", className)} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

ContainerLayout.displayName = "Container";

export default ContainerLayout;
