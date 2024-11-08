"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HiChevronUpDown } from "react-icons/hi2";
import { GoCheck, GoChevronRight } from "react-icons/go";

export default function ProjectSwitcher() {
  const [open, setOpen] = useState(false);

  const projects = ["Project A", "Project B", "Project C"];
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [search, setSearch] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="p-1">
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="h-12 w-full items-center gap-2 p-2 bg-background hover:bg-background"
          >
            <>
              <div
                className={cn(
                  "aspect-square h-full rounded-[2px] bg-foreground/30"
                )}
              ></div>
              <div className="truncate text-left">
                <div className="truncate font-bold">{currentProject}</div>
                <p className="text-xs text-muted-foreground/60">{"Date??"}</p>
              </div>
              <HiChevronUpDown className="ml-auto" />
            </>
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-2 w-96 p-0">
        <Command>
          <CommandInput
            placeholder="Search courses..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No courses found</CommandEmpty>
            <CommandGroup>
              {projects.map((p) => (
                <CommandItem
                  key={p}
                  className="flex h-14 gap-2"
                  value={p}
                  onClick={() => setCurrentProject(p)}
                  onSelect={() => setCurrentProject(p)}
                >
                  <div
                    className={cn(
                      "aspect-square h-full rounded-[2px] bg-foreground/30"
                    )}
                  ></div>
                  <div className="truncate">
                    <div>{p}</div>
                    <div className="text-xs text-muted-foreground/60">
                      {"Data???"}
                    </div>
                  </div>
                  {p === currentProject && <GoCheck className="ml-auto" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <div className="border-t p-1">
            <a href="/course/create" className="">
              <div className="flex w-full items-center justify-between rounded-sm p-2 text-sm font-normal transition-all hover:bg-accent">
                New Project
                <GoChevronRight />
              </div>
            </a>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
