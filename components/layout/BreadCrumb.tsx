import Link from "next/link";
// Types
type BreadCrumbProps = {
  pathname: string;
};

function formatPathName(pathname: string) {
  return pathname
    .split("/")
    .filter((segment) => segment !== "auth" && segment !== "")
    .map((segment) => segment.split("-").join(" "));
}

export const BreadCrumb = ({ pathname }: BreadCrumbProps) => {
  const pathnameFormatted = formatPathName(pathname);
  const firstSegmentRef = pathnameFormatted[0].replaceAll(" ", "-");

  switch (true) {
    case pathnameFormatted.length > 2:
      const secondSegmentRef = pathnameFormatted[1].replaceAll(" ", "-");

      return (
        <div className="flex items-end ml-4 mr-auto">
          <Link href={`/${firstSegmentRef}`}>
            <p className="leading-none !text-[12px] capitalize mr-1">{pathnameFormatted[0]} /</p>
          </Link>
          <Link href={`/${firstSegmentRef}/${secondSegmentRef}`}>
            <h2 className="leading-none !text-[16px] capitalize mr-1">{pathnameFormatted[1]} /</h2>
          </Link>
          <h1 className="leading-none !font-normal !text-[20px] capitalize">
            {pathnameFormatted[2]}
          </h1>
        </div>
      );
    case pathnameFormatted.length === 2:
      return (
        <div className="flex items-end ml-4 mr-auto">
          <Link href={`/${firstSegmentRef}`}>
            <p className="leading-none !text-[16px] capitalize mr-1">{pathnameFormatted[0]} /</p>
          </Link>
          <h1 className="leading-none !font-normal !text-[20px] capitalize">
            {pathnameFormatted[1]}
          </h1>
        </div>
      );
    default:
      console.log();
      return (
        <h1 className="!font-normal !text-[20px] capitalize ml-4 mr-auto">
          {pathnameFormatted[0]}
        </h1>
      );
  }
};
