"use client"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  Calendar,
  LogOut,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { UserNav } from "../user-nav"
import { useFirebase } from "@/firebase"
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/opportunities", icon: KanbanSquare, label: "Opportunities" },
  { href: "/accounts", icon: Users, label: "Accounts" },
  { href: "/agenda", icon: Calendar, label: "Agenda" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { app } = useFirebase()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    const auth = getAuth(app)
    try {
      await signOut(auth)
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente.",
      })
      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cerrar la sesión.",
      })
    }
  }

  return (
    <Sidebar
      className="border-r"
      collapsible="icon"
      variant="sidebar"
      side="left"
    >
      <SidebarHeader className="h-14 items-center justify-center p-2 group-data-[collapsible=icon]:justify-center">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-headline text-lg font-semibold text-sidebar-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-primary"
          >
            <path d="M12 12c-2.4 0-4.7.9-6.5 2.5" />
            <path d="M12 12c2.4 0 4.7.9 6.5 2.5" />
            <path d="M12 12v- конституция" />
            <path d="M12 12c-5.2 0-9.5 3.1-9.5 7v0" />
            <path d="M12 12c5.2 0 9.5 3.1-9.5 7v0" />
            <path d="M7.2 9.5c.8-.5 1.7-.8 2.8-.8s2.1.3 2.8.8" />
            <path d="M12 2a10 10 0 0 0-9.5 7.5" />
            <path d="M21.5 9.5A10 10 0 0 0 12 2" />
          </svg>
          <span className="group-data-[collapsible=icon]:hidden">Aire CRM</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <span>
                    <item.icon />
                    <span>{item.label}</span>
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <div className="group-data-[collapsible=icon]:hidden">
          <UserNav />
        </div>
        <div className="hidden group-data-[collapsible=icon]:block">
           <UserNav isCollapsed />
        </div>
         <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Log Out">
                <span>
                    <LogOut />
                    <span>Log Out</span>
                </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
