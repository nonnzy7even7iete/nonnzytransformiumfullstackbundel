// components/ui/GridDotBackground.tsx
import { cn } from "@/lib/utils";

type GridDotBackgroundProps = {
  className?: string;
};

export function GridDotBackground({ className }: GridDotBackgroundProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:20px_20px]",
        className
      )}
    />
  );
}
