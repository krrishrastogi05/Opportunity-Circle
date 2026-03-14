import { Badge } from "@/components/ui/badge";

export function TagBadge({ tag }: { tag: string }) {
  return (
    <Badge variant="secondary" className="text-xs px-2.5 py-0.5 font-normal">
      {tag}
    </Badge>
  );
}
