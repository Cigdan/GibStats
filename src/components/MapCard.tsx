import React from "react";
import { MapStats } from "@/lib/Types";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Utility for conditional classNames (if you have one)

type MapCardProps = {
  map: MapStats;
};

function MapCard({ map }: MapCardProps) {
  return (
    <Card className={cn("rounded-lg border")}>
      <CardHeader className="p-0">
        <Image
          src={map.img_regular}
          alt={"map"}
          width={400}
          height={200}
          sizes="100"
          className={"w-full h-40 object-cover rounded-t-lg"}
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold text-primary">
          {map.label}
        </CardTitle>
        <CardDescription className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between">
            <h3 className="font-medium">Matches:</h3>
            <h3 className="text-left">{map.stats.Matches}</h3>
          </div>
          <div className="flex justify-between">
            <h3 className="font-medium">Winrate:</h3>
            <h3 className="text-left">{map.stats["Win Rate %"]}%</h3>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default MapCard;
