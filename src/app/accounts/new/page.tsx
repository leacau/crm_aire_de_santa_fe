import { NewAccountForm } from "@/components/accounts/new-account-form";

export default function NewAccountPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-headline font-semibold mb-6">Crear nueva cuenta</h1>
      <NewAccountForm />
    </div>
  );
}
