import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
           <Link href="/" className="flex justify-start gap-2 items-center">
            <Image src={"/nexus.png"}  width={24} alt="Nexus" height={12} className="dark:invert-0 dark:filter-none invert filter"/>
            <h1
              className={cn(
                "font-bold text-xl whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300"
              )}
            >
            Nexus
            </h1>
          </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
