import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MatchItem } from "@/lib/Types";
import MatchEntry from "@/components/MatchEntry";

type MatchTableProps = {
  matches: MatchItem[];
};

function MatchTable({ matches }: MatchTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Map</TableHead>
          <TableHead>Result</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>KD</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className={"overflow-scroll"}>
        {matches.map((match: MatchItem) => (
          <MatchEntry match={match} key={match.stats["Match Id"]} />
        ))}
      </TableBody>
    </Table>
  );
}

export default MatchTable;
