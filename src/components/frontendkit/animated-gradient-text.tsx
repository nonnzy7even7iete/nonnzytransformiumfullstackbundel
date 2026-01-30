import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto flex max-w-fit flex-row items-center justify-center",
        className
      )}
    >
      {/* Cette div contient le gradient animé qui défile.
          On utilise une animation CSS inline pour éviter de toucher au config Tailwind.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes logic-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-logic-gradient {
          background-size: 300% 100%;
          animation: logic-gradient 6s ease infinite;
        }
      `,
        }}
      />

      <div
        className="animate-logic-gradient bg-gradient-to-r from-[#f97316] via-[#22c55e] to-[#f97316] bg-clip-text text-transparent"
        style={{
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {children}
      </div>
    </div>
  );
}
