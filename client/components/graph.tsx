"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const chartConfig = {
  count: {
    label: "Log Count",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function Graph({ className }: { className?: string }) {
  const chartData = [];

  const currentHours = new Date().getHours();

  for (let i = 0; i < 15; i++) {
    const date = new Date();
    date.setHours(currentHours - i);

    chartData.push({
      hour: date.toDateString(),
      count: Math.floor(Math.random() * 100 + 150),
    });
  }

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader>
        <CardTitle>Graph</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-1 flex-grow min-h-0">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
