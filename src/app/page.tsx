import { PlayerSearch } from "@/components/PlayerSearch";
import FaceitButton from "@/components/FaceitButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUserData, getToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = await getToken();
  const isLoggedIn = !!token;
  if (isLoggedIn) {
    const data = await getUserData();
    if (data) {
      if (data?.guid) {
        redirect("/stats/" + data.guid);
      }
    }
  }
  return (
    <div className={"w-full flex items-center justify-center"}>
      <Card className={"w-5/6 md:w-4/6 lg:w-3/6 mt-24"}>
        <CardHeader>
          <span className={"text-4xl font-bold"}>GibStats</span>
          <span className={"text-lg"}>
            Find detailed stats for any FACEIT player
          </span>
        </CardHeader>
        <CardContent>
          <PlayerSearch />
          <div className={"flex flex-row gap-2 items-center mt-4"}>
            <span className={"text-md font-bold"}>Or</span>
            <FaceitButton variant={"long"} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
