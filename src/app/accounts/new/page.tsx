import { NewAccountForm } from "@/components/accounts/new-account-form";
import AppLayout from "@/components/layout/app-layout";

export default function NewAccountPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-headline font-semibold mb-6">Crear nueva cuenta</h1>
        <NewAccountForm />
      </div>
    </AppLayout>
  );
}
