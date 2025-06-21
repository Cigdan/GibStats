"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserData, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function FaceitAvatar() {
  const router = useRouter();
  const [source, setSource] = useState<string>("");
  useEffect(() => {
    // Set source of Profile Picture
    getUserData().then((user) => {
      setSource(user.picture);
    });
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={source} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* ---- My Stats Button ---- */}
        <DropdownMenuItem
          onClick={async () => {
            const data = await getUserData();
            if (data.error) {
              toast.error(`Could not retrieve your user data: ${data.error}`);
              console.error(data.error);
              return;
            }
            if (data?.guid) {
              router.push("/stats/" + data.guid);
            }
          }}
        >
          My Stats
        </DropdownMenuItem>

        {/* ---- Favourites Button ---- */}
        <DropdownMenuItem
          onClick={() => {
            router.push("/favourites");
          }}
        >
          Favourites
        </DropdownMenuItem>

        {/* ---- Logout Button ---- */}
        <DropdownMenuItem
          onClick={() => {
            logout().then(() => router.refresh());
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FaceitAvatar;
