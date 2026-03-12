import { cn } from "@/lib/utils";
import seeksyLogo from "@/assets/seeksy-logo-orange.png";

interface SparkMascotProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export function SparkMascot({ className, size = "md", animate = true }: SparkMascotProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        "relative flex items-center justify-center",
        animate && "group",
        className
      )}
    >
      <img
        src={seeksyLogo}
        alt="Seeksy"
        className={cn(
          "w-full h-full object-contain rounded-full transition-transform duration-300",
          animate && "group-hover:scale-110"
        )}
        draggable={false}
      />
    </div>
  );
}
