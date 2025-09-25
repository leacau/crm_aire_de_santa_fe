import { activities, users, opportunities } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, Users as MeetingIcon, FileText, ArrowRight } from "lucide-react";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";

const activityIcons = {
  llamada: <Phone className="h-5 w-5" />,
  email: <Mail className="h-5 w-5" />,
  reunión: <MeetingIcon className="h-5 w-5" />,
  nota: <FileText className="h-5 w-5" />,
};

const userMap = users.reduce((acc, user) => {
  acc[user.uid] = user;
  return acc;
}, {} as Record<string, typeof users[0]>);

const opportunityMap = opportunities.reduce((acc, opp) => {
    acc[opp.opportunityId] = opp;
    return acc;
}, {} as Record<string, typeof opportunities[0]>);

export function ActivityTimeline() {
  const sortedActivities = [...activities].sort((a, b) => b.when.getTime() - a.when.getTime());

  return (
    <div className="relative pl-6 before:absolute before:left-6 before:top-0 before:h-full before:w-px before:bg-border">
      {sortedActivities.map((activity) => {
        const user = userMap[activity.createdBy];
        const opportunity = opportunityMap[activity.entityId];

        return (
          <div key={activity.activityId} className="relative mb-8 flex items-start gap-6">
            <div className="absolute -left-[35px] top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {activityIcons[activity.type]}
            </div>
            <div className="w-full">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-3">
                    {user && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl} alt={user.fullName} data-ai-hint="person face" />
                        <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <CardTitle className="text-base font-medium">
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        {opportunity && ` con ${opportunity.accountName}`}
                      </CardTitle>
                       <p className="text-xs text-muted-foreground">
                        por {user?.fullName || 'Usuario Desconocido'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {format(activity.when, "PPp")}
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/90">{activity.summary}</p>
                   {activity.nextAction && (
                    <div className="mt-3 flex items-center gap-2 rounded-md bg-accent/20 p-2 text-xs">
                        <Badge variant="secondary" className="bg-accent text-accent-foreground">Próxima acción</Badge>
                        <span>{activity.nextAction}</span>
                        {activity.nextActionDate && (
                            <>
                                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                <span className="font-medium">{format(activity.nextActionDate, "PP")}</span>
                            </>
                        )}
                    </div>
                   )}
                </CardContent>
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
}
