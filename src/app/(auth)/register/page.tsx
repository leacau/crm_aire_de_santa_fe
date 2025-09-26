"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useFirebase } from "@/firebase";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "El nombre es obligatorio."),
    lastName: z.string().min(1, "El apellido es obligatorio."),
    email: z.string().email("Por favor, introduce un email válido."),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const { app } = useFirebase();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName: values.firstName,
        lastName: values.lastName,
        role: "asesor",
        createdAt: serverTimestamp(),
      });
      
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
      });

      router.push("/login");

    } catch (error: any) {
      let errorMessage = "Ocurrió un error durante el registro.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email ya está registrado.';
      } else if (error.code) {
        errorMessage = `Error: ${error.code}`;
      }
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: errorMessage,
      });
      console.error("Error creating user:", error);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="mb-4 flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-primary"
            >
                <path d="M12 12c-2.4 0-4.7.9-6.5 2.5" />
                <path d="M12 12c2.4 0 4.7.9 6.5 2.5" />
                <path d="M12 12v- конституция" />
                <path d="M12 12c-5.2 0-9.5 3.1-9.5 7v0" />
                <path d="M12 12c5.2 0 9.5 3.1 9.5 7v0" />
                <path d="M7.2 9.5c.8-.5 1.7-.8 2.8-.8s2.1.3 2.8.8" />
                <path d="M12 2a10 10 0 0 0-9.5 7.5" />
                <path d="M21.5 9.5A10 10 0 0 0 12 2" />
            </svg>
         </div>
        <CardTitle className="text-2xl font-headline">Crear una cuenta</CardTitle>
        <CardDescription>
          Ingresá tus datos para registrarte en Aire CRM.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Crear Cuenta
            </Button>
          </CardContent>
        </form>
      </Form>
      <CardFooter className="flex justify-center text-center text-sm">
        ¿Ya tenés una cuenta?
        <Link href="/login" className="underline ml-1">
          Iniciar Sesión
        </Link>
      </CardFooter>
    </Card>
  );
}
