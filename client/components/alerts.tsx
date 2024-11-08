import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export function generateContent() {
  return {
    time: new Date(),
    level: "info",
    content: Math.random().toString(36).substring(2, 22),
  };
}
export type MessageLog = {
  level: "info" | "warning" | "error" | "critical";
  content: string;
  time: Date;
};

// type DataLog = {
//   name: string;
//   value: number;
//   time: Date;
// };

type Alert = {
  severity: "low" | "medium" | "high" | "critical";
  time: Date;
  title: string;
  serviceId: string;
};

const map = {
  low: "ring-2 ring-neutral-400 bg-neutral-50",
  medium: "ring-2 ring-yellow-400 bg-yellow-50",
  high: "ring-2 ring-orange-400 bg-orange-50",
  critical: "ring-2 ring-red-400 bg-red-50",
};

const icons = {
  low: Info,
  medium: Info,
  high: Info,
  critical: Info,
};

function AlertComp({ alert }: { alert: Alert }) {
  const Icon = icons[alert.severity];

  return (
    <div
      className={`flex items-center text-sm rounded-md py-1 px-2 ${
        map[alert.severity]
      }`}
    >
      <Icon size={25} className="mr-2" />
      <div className="flex flex-col">
        <div className="font-bold flex items-center">{alert.title}</div>
        <div className="text-accent-foreground">{alert.time.toISOString()}</div>
      </div>
    </div>
  );
}

export default function Alerts({ className }: { className: string }) {
  // 2 severe alerts and 5 low alerts
  const alerts: Alert[] = [
    {
      severity: "low",
      time: new Date(),
      title: "Service is running",
      serviceId: "1",
    },
    {
      severity: "low",
      time: new Date(),
      title: "Service is running",
      serviceId: "2",
    },
    {
      severity: "low",
      time: new Date(),
      title: "Service is running",
      serviceId: "3",
    },
    {
      severity: "low",
      time: new Date(),
      title: "Service is running",
      serviceId: "4",
    },
    {
      severity: "low",
      time: new Date(),
      title: "Service is running",
      serviceId: "5",
    },
    {
      severity: "medium",
      time: new Date(),
      title: "Service is running",
      serviceId: "6",
    },
    {
      severity: "critical",
      time: new Date(),
      title: "Service is running",
      serviceId: "7",
    },
    {
      severity: "critical",
      time: new Date(),
      title: "Service is running",
      serviceId: "7",
    },
  ];

  // sort by severity
  alerts.sort((a, b) => {
    const order = {
      low: 0,
      medium: 1,
      high: 2,
      critical: 3,
    };

    return order[a.severity] - order[b.severity];
  });
  alerts.reverse();

  return (
    <Card className={cn("w-full flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 relative">
        <div className=" flex flex-col gap-2 overflow-auto h-full w-full p-1 rounded-md">
          {alerts.map((alert, index) => (
            <AlertComp key={index} alert={alert} />
          ))}
        </div>
        <div className="absolute h-20 bottom-0 left-0 z-20 w-full bg-gradient-to-b from-transparent to-background"></div>
      </CardContent>
    </Card>
  );
}
