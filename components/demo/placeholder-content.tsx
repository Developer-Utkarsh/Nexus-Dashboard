import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export default function PlaceholderContent() {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-198px)]">
         
        </div>
      </CardContent>
    </Card>
  );
}
