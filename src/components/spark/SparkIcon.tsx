/**
 * Unified SparkIcon Component
 * Central component for all Seeksy logo usage throughout the platform
 */

import { cn } from "@/lib/utils";
import seeksyLogo from "@/assets/seeksy-logo-orange.png";

export type SparkVariant = "default" | "holiday";
export type SparkIconSize = "sm" | "md" | "lg" | "xl" | number;
export type SparkPose = "idle" | "waving" | "happy" | "typing" | "thinking";

interface SparkIconProps {
  variant?: SparkVariant;
  size?: SparkIconSize;
  animated?: boolean;
  pose?: SparkPose;
  className?: string;
  onClick?: () => void;
}

const SIZE_MAP: Record<string, number> = {
  sm: 32,
  md: 48,
  lg: 72,
  xl: 96,
};

export const SparkIcon = ({
  size = "md",
  animated = false,
  className,
  onClick,
}: SparkIconProps) => {
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size];

  return (
    <div
      className={cn("relative inline-block", className)}
      onClick={onClick}
    >
      <img
        src={seeksyLogo}
        alt="Seeksy"
        className={cn(
          "object-contain select-none rounded-full",
          animated && "transition-transform duration-300 hover:scale-110",
          onClick && "cursor-pointer"
        )}
        style={{
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
        }}
        draggable={false}
      />
    </div>
  );
};
