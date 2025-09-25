import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DollarSign, Users, Target, TrendingUp } from "lucide-react"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { SalesFunnelChart } from "@/components/dashboard/sales-funnel-chart"
import { PlatformRevenueChart } from "@/components/dashboard/platform-revenue-chart"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Monto ganado (mes)"
          value="$125,430"
          change="+20.1% from last month"
          icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Proyección"
          value="$231,580"
          change="Pipeline total"
          icon={<Target className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Leads nuevos"
          value="+45"
          change="+12 since last week"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Tasa de conversión"
          value="23.5%"
          change="+1.8% from last month"
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Mix de ingresos por plataforma</CardTitle>
          </CardHeader>
          <CardContent>
            <PlatformRevenueChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Embudo de Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesFunnelChart />
          </CardContent>
        </Card>
      </div>
      
    </div>
  )
}
