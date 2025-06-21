import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type StatCardProgressProps = {
  title: string;
  value: number;
  suffix: string;
  max: number;
};

export function StatCardProgress({
  title,
  value,
  suffix = "",
  max,
}: StatCardProgressProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toString() + suffix}</div>
        <Progress max={max} value={value} className="mt-2" />
      </CardContent>
    </Card>
  );
}
