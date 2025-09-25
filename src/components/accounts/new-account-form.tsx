"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const accountSchema = z.object({
  displayName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  industry: z.enum(["comercio", "servicios", "gobierno", "otro"]),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres."),
  province: z.string().min(2, "La provincia debe tener al menos 2 caracteres."),
  cuitDni: z.string().optional(),
  website: z.string().url("Debe ser una URL válida.").optional().or(z.literal('')),
  notes: z.string().optional(),
});

export function NewAccountForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      displayName: "",
      industry: "comercio",
      city: "",
      province: "Santa Fe",
      cuitDni: "",
      website: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof accountSchema>) {
    console.log(values);
    toast({
      title: "Cuenta creada",
      description: `La cuenta "${values.displayName}" ha sido creada exitosamente.`,
    });
    router.push("/accounts");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="p-6 border rounded-lg bg-card text-card-foreground">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                    <FormLabel>Nombre de la Cuenta</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: Mi Empresa SRL" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Industria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione una industria" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="comercio">Comercio</SelectItem>
                        <SelectItem value="servicios">Servicios</SelectItem>
                        <SelectItem value="gobierno">Gobierno</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="cuitDni"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>CUIT/DNI</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: 30-12345678-9" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: Santa Fe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Provincia</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: Santa Fe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                    <FormLabel>Sitio Web</FormLabel>
                    <FormControl>
                        <Input placeholder="https://www.ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                    <FormLabel>Notas</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Notas internas sobre la cuenta..."
                        className="resize-none"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
        </div>
        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
            </Button>
            <Button type="submit">Guardar Cuenta</Button>
        </div>
      </form>
    </Form>
  );
}
