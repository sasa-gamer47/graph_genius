import * as z from "zod";

export const ChartValidation = z.object({
    title: z.string().nonempty().min(3, { message: "Minimum 3 characters." }).max(100, { message: 'Maximum 100 characters.' }),
    type: z.string(),
    description: z.string().nonempty().min(3).max(1000).optional(),
    tags: z.any(),
    options: z.any(),
    datasetsCount: z.string().min(1).max(2).optional(),
    datasets: z.any().optional(),
    labels: z.any().optional(),
    series: z.any(),
    path: z.any().optional(),
    author: z.any().optional(),
});
