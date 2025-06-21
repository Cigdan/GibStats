import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { MatchItem } from "@/lib/Types";
import Link from "next/link";

type MatchEntryProps = {
  match: MatchItem;
};

function MatchEntry({ match }: MatchEntryProps) {
  return (
    <TableRow>
      <TableCell>
        <div className={"flex flex-row gap-2 items-center"}>
          <span>
            {new Date(match.stats["Created At"]).toLocaleDateString()}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className={"flex flex-row gap-2 items-center"}>
          <Image
            width={25}
            height={25}
            src={`/images/maps/${match.stats.Map}.png`}
            alt={match.stats.Map}
          />
          <span className={"hidden md:inline-block"}>
            {match.stats.Map.slice(3).charAt(0).toUpperCase() +
              match.stats.Map.slice(4)}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          className={"hidden md:inline-block"}
          variant={match.stats.Result === "1" ? "outline" : "destructive"}
        >
          {match.stats.Result === "1" ? "Win" : "Loss"}
        </Badge>
        <Badge
          className={"md:hidden"}
          variant={match.stats.Result === "1" ? "outline" : "destructive"}
        >
          {match.stats.Result === "1" ? "W" : "L"}
        </Badge>
      </TableCell>
      <TableCell className={"text-nowrap"}>{match.stats.Score}</TableCell>
      <TableCell className={"text-nowrap"}>
        {match.stats.Kills} / {match.stats.Deaths}
      </TableCell>
      <TableCell>
        <Link
          href={`https://www.faceit.com/en/cs2/room/${match.stats["Match Id"]}`}
          target="_blank"
        >
          <Button size="sm" variant="outline">
            <span className={"hidden md:inline-block"}>View Match</span>
            <ExternalLinkIcon className="mx-2 h-4 w-4" />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}

export default MatchEntry;
