"use client"

import { Funnel, FunnelChart, LabelList, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { value: 100, name: "Lead", fill: "hsl(var(--chart-1))" },
  { value: 80, name: "Contacto", fill: "hsl(var(--chart-2))" },
  { value: 50, name: "Propuesta", fill: "hsl(var(--chart-3))" },
  { value: 40, name: "Negociación", fill: "hsl(var(--chart-4))" },
  { value: 20, name: "Ganado", fill: "hsl(var(--chart-5))" },
]

export function SalesFunnelChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart>
          <Tooltip 
            contentStyle={{ 
              background: 'hsl(var(--background))', 
              borderColor: 'hsl(var(--border))'
            }} 
          />
          <Funnel dataKey="value" data={data} isAnimationActive>
            <LabelList
              position="right"
              fill="hsl(var(--foreground))"
              stroke="none"
              dataKey="name"
              className="font-sans"
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  )
}
