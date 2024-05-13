import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const Section = (
  props: PropsWithChildren<{
    className?: string;
  }>
) => {
  return (
    <section
      className={cn("mx-auto max-w-7xl px-4 h-full w-full", props.className)}
    >
      {props.children}
    </section>
  );
};
