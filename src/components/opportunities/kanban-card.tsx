import type { Opportunity, User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface KanbanCardProps {
  opportunity: Opportunity;
  owner?: User;
}

const platformColors: Record<Opportunity['platform'], string> = {
  radio: "bg-blue-200 text-blue-800",
  tv: "bg-purple-200 text-purple-800",
  digital: "bg-green-200 text-green-800",
  redes: "bg-pink-200 text-pink-800",
  mixto: "bg-gray-200 text-gray-800",
};

export function KanbanCard({ opportunity, owner }: KanbanCardProps) {
  const ownerInitials = owner?.fullName.split(' ').map(n => n[0]).join('') || 'U';

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-medium leading-tight">{opportunity.accountName}</CardTitle>
          {owner && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={owner.avatarUrl} data-ai-hint="person face" alt={owner.fullName} />
                    <AvatarFallback>{ownerInitials}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{owner.fullName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-primary">{formatCurrency(opportunity.estAmount)}</span>
          <Badge variant="outline" className={`border-0 ${platformColors[opportunity.platform]}`}>
            {opportunity.platform.charAt(0).toUpperCase() + opportunity.platform.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
