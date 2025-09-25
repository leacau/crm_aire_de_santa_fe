'use server';

/**
 * @fileOverview Calculates and projects KPIs for each sales stage, enhanced by generative AI for anomaly detection.
 *
 * - projectKpisWithGenAI - A function that handles the KPI projection process.
 * - ProjectKpisWithGenAIInput - The input type for the projectKpisWithGenAI function.
 * - ProjectKpisWithGenAIOutput - The return type for the projectKpisWithGenAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectKpisWithGenAIInputSchema = z.object({
  salesData: z.string().describe('Sales data in JSON format including stage, estAmount, and closeProbability.'),
});
export type ProjectKpisWithGenAIInput = z.infer<typeof ProjectKpisWithGenAIInputSchema>;

const ProjectKpisWithGenAIOutputSchema = z.object({
  projectedKpis: z.string().describe('Projected KPIs for each sales stage with anomaly detection insights.'),
});
export type ProjectKpisWithGenAIOutput = z.infer<typeof ProjectKpisWithGenAIOutputSchema>;

export async function projectKpisWithGenAI(input: ProjectKpisWithGenAIInput): Promise<ProjectKpisWithGenAIOutput> {
  return projectKpisWithGenAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectKpisWithGenAIPrompt',
  input: {schema: ProjectKpisWithGenAIInputSchema},
  output: {schema: ProjectKpisWithGenAIOutputSchema},
  prompt: `You are an AI assistant specialized in sales performance analysis.

  Analyze the following sales data and project KPIs for each sales stage. Also, use your knowledge to detect any anomalies or unusual patterns in the data and provide insights.

  Sales Data: {{{salesData}}}

  Provide the projected KPIs for each stage along with anomaly detection insights in a structured format.
`,
});

const projectKpisWithGenAIFlow = ai.defineFlow(
  {
    name: 'projectKpisWithGenAIFlow',
    inputSchema: ProjectKpisWithGenAIInputSchema,
    outputSchema: ProjectKpisWithGenAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
