import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import {PlayerData} from "@/lib/Types";
import {Crosshair, Trophy, Scale, EyeOff, DoorOpen } from 'lucide-react';


type StatsTableProps = {
  data: PlayerData;
};

export function StatsTable({data}: StatsTableProps) {
  if (!data.lifetime) {
    return <></>
  }
  return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={"flex flex-row items-center gap-2"}>
              <Crosshair height={"20"} />
              <span className="font-medium">Total Kills</span>
            </TableCell>
            <TableCell>{parseFloat(data.lifetime["Total Kills with extended stats"])}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={"flex flex-row items-center gap-2"}>
              <Trophy height={"20"} />
              <span className="font-medium">Wins</span>
            </TableCell>
            <TableCell>{Math.round(parseFloat(data.lifetime["Total Matches"]) / 100 * parseFloat(data.lifetime["Win Rate %"]))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={"flex flex-row items-center gap-2"}>
              <Scale height={"20"} />
              <span className="font-medium">1v1 Win Rate</span>
            </TableCell>
            <TableCell>{parseFloat(data.lifetime["1v1 Win Rate"]) * 100}%</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={"flex flex-row items-center gap-2"}>
              <DoorOpen height={"20"} />
              <span className="font-medium">Entry Success Rate</span>
            </TableCell>
            <TableCell>
              {parseFloat(data.lifetime["Entry Success Rate"]) * 100}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={"flex flex-row items-center gap-2"}>
              <EyeOff height={"20"} />
              <span className="font-medium">Flash Success Rate</span>
            </TableCell>
            <TableCell>
              {parseFloat(data.lifetime["Flash Success Rate"]) * 100}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
  );
}
