import { cn } from "@ui/lib/utils";
import React, { ReactNode } from "react";

const MenuItem = ({
  className,
  children,
}: {
  className?: string | undefined;
  children: ReactNode;
}) => (
  <div className={cn("flex flex-col p-4 text-center", className)}>
    {children}
  </div>
);

const MenuText = ({
  className,
  children,
}: {
  className?: string | undefined;
  children: ReactNode;
}) => <span className={(cn(""), className)}>{children}</span>;

export { MenuItem, MenuText };
