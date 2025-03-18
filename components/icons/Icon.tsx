import { icons } from "./icons";
// Types
export type IconType = (typeof icons)[number]["name"];
type IconPreset = "input-end" | "sort-asc" | "sort-desc";
type IconProps = {
  icon: IconType;
  iconWidth?: number;
  iconHeight?: number;
  iconColor?: string;
  iconPreset?: IconPreset;
  click?: (e: any) => void;
};

export const Icon = ({ icon, iconWidth, iconHeight, iconColor, iconPreset, click }: IconProps) => {
  const iconName = icon === "dots-grid" ? "dots" : icon === "user-menu" ? "user" : icon;
  const isInputEnd = iconPreset === "input-end";
  const currentIcon = icons.find(({ name }) => name === iconName) as
    | {
        name: IconType;
        paths: {
          d: string;
          color?: string;
          strokeWidth?: number;
          fillRule?: "evenodd";
          clipRule?: "evenodd";
        }[];
        dimensions: [number, number];
      }
    | undefined;
  if (!currentIcon) {
    return null;
  }
  // Styles
  const wrapperClassName = `w-fit flex items-center justify-center ${
    iconName === "dots" ? "" : "transition-all duration-200 ease-in-out"
  } m-0 ${isInputEnd ? "h-full absolute right-2 top-0" : ""}${
    click || icon === "search" ? " cursor-pointer" : ""
  }${icon === "dots" ? " mr-4" : icon === "dots-grid" ? " ml-auto" : ""}${
    icon === "pending" ? "my-2" : ""
  }${icon === "logo-dads" ? " pr-4 mr-4 border-r border-[#c1c9be]" : ""}${
    icon === "search" ? " absolute top-4 left-4" : ""
  }${icon === "user-menu" ? " !w-12 h-12 bg-primary rounded-full" : ""}${
    iconPreset === "sort-desc" ? " rotate-180" : ""
  }`;
  const [width, height] = currentIcon.dimensions;
  const svgWidth = iconWidth ?? width;
  const svgHeight = isInputEnd ? "100%" : iconHeight ?? height;
  return (
    <div className={wrapperClassName} onClick={click}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {currentIcon.paths.map((path, index) => {
          const pathProps = {
            d: path.d,
            fill: iconColor ?? path.color ?? "currentColor",
            ...(path.strokeWidth && {
              stroke: iconColor ?? path.color ?? "currentColor",
              strokeWidth: path.strokeWidth,
            }),
            ...(["arrow", "warning"].includes(icon) && {
              stroke: path.color,
            }),
            ...(path.fillRule && {
              fillRule: path.fillRule,
            }),
            ...(path.clipRule && {
              clipRule: path.clipRule,
            }),
          };
          return <path key={index} {...pathProps} />;
        })}
      </svg>
    </div>
  );
};
