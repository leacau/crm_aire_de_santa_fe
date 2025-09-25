import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { accounts, users } from "@/lib/data"
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AccountsTable() {
  const userMap = users.reduce((acc, user) => {
    acc[user.uid] = user;
    return acc;
  }, {} as Record<string, typeof users[0]>);

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Industria</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => {
            const owner = userMap[account.ownerUid];
            const ownerInitials = owner?.fullName.split(' ').map(n => n[0]).join('') || 'U';

            return (
              <TableRow key={account.accountId}>
                <TableCell className="font-medium">{account.displayName}</TableCell>
                <TableCell>{account.industry.charAt(0).toUpperCase() + account.industry.slice(1)}</TableCell>
                <TableCell>{account.city}</TableCell>
                <TableCell>
                  <Badge variant={account.status === 'activo' ? 'default' : 'secondary'} className={account.status === 'activo' ? 'bg-green-500/20 text-green-700' : ''}>
                    {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {owner && (
                     <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex justify-end">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={owner.avatarUrl} alt={owner.fullName} data-ai-hint="person face" />
                              <AvatarFallback>{ownerInitials}</AvatarFallback>
                            </Avatar>
                           </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{owner.fullName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
