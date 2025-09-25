import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
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
        <CardTitle className="text-2xl font-headline">Iniciar Sesión</CardTitle>
        <CardDescription>
          Bienvenido a Aire CRM. Ingresá tus credenciales.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Ingresar
        </Button>
        <Button variant="outline" className="w-full">
          Ingresar con Google
        </Button>
      </CardContent>
      <CardFooter className="text-center text-sm">
          ¿No tenés una cuenta?{" "}
          <Link href="#" className="underline ml-1">
            Registrate
          </Link>
      </CardFooter>
    </Card>
  )
}
