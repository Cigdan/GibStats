import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import {MatchItem} from "@/lib/Types";
import {Crosshair, Skull, Handshake, Flame, Crown} from 'lucide-react';
import {
  getMultiKills,
  getMvps,
  getTotalKills,
  getAssists,
  getDeaths,
} from "@/lib/matchDataFunctions";

type StatsTableProps = {
  matches: MatchItem[];
};

export function RecentStatsTable({matches}: StatsTableProps) {
  return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={"flex flex-row items-center gap-2"}>
              <Crosshair height={"20"} />
              <span className="font-medium">Kills</span>
            </TableCell>
            <TableCell>{getTotalKills(matches)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={"flex flex-row items-center gap-2"}>
              <Skull height={"20"} />
              <span className="font-medium">Deaths</span>
            </TableCell>
            <TableCell>{getDeaths(matches)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={"flex flex-row items-center gap-2"}>
              <Handshake height={"20"} />
              <span className="font-medium">Assists</span>
            </TableCell>
            <TableCell>{getAssists(matches)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={"flex flex-row items-center gap-2"}>
              <Flame height={"20"} />
              <span className="font-medium">Multi-Kills</span>
            </TableCell>
            <TableCell>{getMultiKills(matches)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={"flex flex-row items-center gap-2"}>
              <Crown height={"20"} />
              <span className="font-medium">MVPs</span>
            </TableCell>
            <TableCell>{getMvps(matches)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
  );
}
