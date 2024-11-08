import User from "@/components/user";
import { Service } from "@/lib/service";
import { House } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default async function Sidebar({
  name,
  picture,
}: {
  name: string;
  picture?: string;
}) {
    const response = await fetch("http://127.0.0.1:8000/getServices")

  // gives a list of strings
  const services = await response.json() as {
    id: string;
    service: string;
  }[]

  



  return (
    <div className="h-full w-60 bg-accent p-3 flex flex-col gap-2 border-r">
      <User name={name} picture={picture} />
      {/* <Link
        href="/"
        className="flex items-center gap-1 rounded-lg py-1 px-2 hover:bg-muted"
      >
        <House size={20} />
        Dashboard
      </Link> */}
      {/* <div className="font-bold text-accent-foreground">Services</div> */}
      {services.map((service) => (
        <Link
          key={service.id}
          href={`/service/${service.id}`}
          className="flex flex-col rounded-lg py-1 px-2 hover:bg-muted"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse bg-green-500"></div>
            {service.service}
          </div>
        </Link>
      ))}
    </div>
  );
}
