import { ActivityTimeline } from "@/components/agenda/activity-timeline";
import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AgendaPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-headline font-semibold">Agenda de Actividades</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Registrar Interacción
          </Button>
        </div>
        <ActivityTimeline />
      </div>
    </AppLayout>
  );
}
