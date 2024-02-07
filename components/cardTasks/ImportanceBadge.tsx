import { Badge } from "../ui/badge";

export default function ImportanceBadge({ importance }: { importance: string }) {
  let importanceColor = "";

  switch (importance) {
    case "very important":
      importanceColor = "rgb(239 68 68)";
      break;

    case "important":
      importanceColor = "rgb(249 115 22)";
      break;

    case "less important":
      importanceColor = "rgb(59 130 246)";
      break;

    case "optional":
      importanceColor = "rgb(148 163 184)";
      break;

    default:
      importanceColor = "gray";
  }

  return (
    <Badge
      style={{
        background: `${importanceColor}`,
      }}
      className="sm:text-sm text-xs rounded-md"
    >
      {importance}
    </Badge>
  );
}
