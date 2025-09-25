"use client";

import { useState } from "react";
import { useAI } from "genkit/next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { projectKpisWithGenAI } from "@/ai/flows/project-kpis-with-gen-ai";
import { opportunities } from "@/lib/data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export function KpiProjection() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProjection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const salesData = JSON.stringify(opportunities);
      const response = await projectKpisWithGenAI({ salesData });
      setResult(response.projectedKpis);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle className="font-headline flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Análisis y Proyección de KPIs con IA
            </CardTitle>
            <CardDescription>
              Utilizá el poder de la IA para analizar el pipeline actual, detectar anomalías y obtener proyecciones.
            </CardDescription>
          </div>
          <Button onClick={handleProjection} disabled={loading}>
            {loading ? "Analizando..." : "Generar Proyección"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error de Análisis</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <div className="prose prose-sm dark:prose-invert max-w-none text-foreground rounded-lg border bg-secondary/50 p-4">
            <pre className="whitespace-pre-wrap bg-transparent p-0 font-sans text-sm">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
