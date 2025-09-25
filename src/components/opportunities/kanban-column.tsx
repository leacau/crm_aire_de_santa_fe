import type { Opportunity, User } from "@/lib/types";
import { KanbanCard } from "./kanban-card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface KanbanColumnProps {
  title: string;
  opportunities: Opportunity[];
  userMap: Record<string, User>;
}

export function KanbanColumn({ title, opportunities, userMap }: KanbanColumnProps) {
  return (
    <div className="flex w-72 flex-col rounded-lg bg-secondary/50">
      <div className="flex items-center justify-between p-3">
        <h2 className="font-semibold text-foreground">{title}</h2>
        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary-foreground">
          {opportunities.length}
        </span>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-3 p-3 pt-0">
          {opportunities.map(opp => (
            <KanbanCard key={opp.opportunityId} opportunity={opp} owner={userMap[opp.ownerUid]} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
