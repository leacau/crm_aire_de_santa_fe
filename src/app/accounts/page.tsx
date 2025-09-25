import { AccountsTable } from "@/components/accounts/accounts-table";
import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";

export default function AccountsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-headline font-semibold">Cuentas</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar cuentas..." className="pl-8 sm:w-[300px]" />
            </div>
            <Button asChild>
              <Link href="/accounts/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Crear Cuenta
              </Link>
            </Button>
          </div>
        </div>
        <AccountsTable />
      </div>
    </AppLayout>
  );
}
