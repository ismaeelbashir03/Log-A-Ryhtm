"use client";

import Alerts, { generateContent, MessageLog } from "@/components/alerts";
import { columns } from "@/components/console/columns";
import { ConsoleTable } from "@/components/console/console";
import Graph from "@/components/graph";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<MessageLog[]>([]);

  useEffect(() => {
    const ws = new WebSocket(
      "ws://assured-grubworm-wrongly.ngrok-free.app/getAlerts"
      // "ws://127.0.0.1:8000/getAlerts"
    );

    ws.onmessage = (event: MessageEvent) => {
      const res = JSON.parse(event.data)["alerts"];
      const result: MessageLog[] = [];
      for (const newLog of res) {
        const log: MessageLog = {
          content: newLog["content"],
          level: newLog["level"],
          time: new Date(newLog["timestamp"]),
        };
        result.push(log);
      }

      setData((prev) => [...result, ...prev]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="w-full flex flex-col gap-3 flex-grow min-h-0">
        <div className="h-96 w-full flex gap-3">
          <Graph className="flex-[2]" />
          <Alerts className="flex-1" />
        </div>
        <div className="flex-grow min-h-0">
          <ConsoleTable
            data={data}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
}
