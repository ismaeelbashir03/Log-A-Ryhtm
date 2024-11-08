"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import Image from "next/image";

type Props = {
  name: string;
  picture?: string;
};
export default function User({ name, picture }: Props) {
  const [open, setOpen] = useState(false);
  const role = "admin";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="h-12 w-full items-center gap-2 p-2 bg-background hover:bg-background border"
          >
            <>
              {picture ? (
                <Image
                  alt="profile image"
                  src={picture}
                  width={100}
                  height={100}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-lg">
                  {name[0].toUpperCase()}
                </div>
              )}
              <div className="truncate text-left">
                <div className="truncate font-bold">{name}</div>
                <p className="text-xs text-muted-foreground/60">{role}</p>
              </div>
              <HiChevronUpDown className="ml-auto" />
            </>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem> */}
          <DropdownMenuItem
            onClick={() => {
              window.location.href = "/api/auth/logout";
            }}
          >
            <LogOut /> Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
