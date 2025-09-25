import { opportunities, users } from "@/lib/data";
import type { Opportunity, User } from "@/lib/types";
import { KanbanColumn } from "./kanban-column";

const stages: Opportunity['stage'][] = ['lead', 'contacto', 'propuesta', 'negociación', 'ganado', 'perdido'];

const stageTitles: Record<Opportunity['stage'], string> = {
  lead: "Lead",
  contacto: "Contacto",
  propuesta: "Propuesta",
  negociación: "Negociación",
  ganado: "Ganado",
  perdido: "Perdido",
};

export function KanbanBoard() {
  const opportunitiesByStage = stages.reduce((acc, stage) => {
    acc[stage] = opportunities.filter(opp => opp.stage === stage);
    return acc;
  }, {} as Record<Opportunity['stage'], Opportunity[]>);

  const userMap = users.reduce((acc, user) => {
    acc[user.uid] = user;
    return acc;
  }, {} as Record<string, User>);

  return (
    <div className="flex h-full min-w-max gap-4 pb-4">
      {stages.map(stage => (
        <KanbanColumn
          key={stage}
          title={stageTitles[stage]}
          opportunities={opportunitiesByStage[stage]}
          userMap={userMap}
        />
      ))}
    </div>
  );
}
