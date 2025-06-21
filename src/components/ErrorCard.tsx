import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Frown } from "lucide-react";

type ErrorCardProps = {
  title: string | null;
  description: string | null;
};

function ErrorCard({ title, description }: ErrorCardProps) {
  return (
    <Card className={"max-w-96"}>
      <CardHeader className={"flex flex-col items-center gap-2 pb-4"}>
        <Frown width={48} height={48} />
        <span className={"text-2xl font-bold text-primary"}>{title}</span>
      </CardHeader>
      <CardContent className={"flex justify-center"}>
        <span className={"text-primary text-center"}>{description}</span>
      </CardContent>
    </Card>
  );
}

export default ErrorCard;
