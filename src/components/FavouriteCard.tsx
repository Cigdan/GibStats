"use client";
import { FavouritesRow, Player } from "@/lib/Types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FavouriteIcon from "@/components/FavouriteIcon";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { editFavouriteNickname } from "@/lib/db";
import { toast } from "sonner";

type FavouriteIconType = {
  favourite: FavouritesRow;
  token: string | undefined;
  playerData: Player;
};

function FavouriteCard({ favourite, token, playerData }: FavouriteIconType) {
  const router = useRouter();
  const [favNickname, setFavNickname] = useState<string>(favourite.nickname);
  const [newNickname, setNewNickname] = useState<string>(
    favourite.nickname || playerData.nickname,
  );
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Card
      className={
        "cursor-pointer hover:scale-105 transition-all md:max-w-96 w-[100%] md:w-auto"
      }
      onClick={() => {
        router.push("/stats/" + playerData.player_id);
      }}
    >
      <CardHeader className="flex flex-row items-center justify-start gap-4 space-y-0 pb-2">
        <Avatar className="h-20 w-20">
          <AvatarImage src={playerData.avatar} alt={playerData.nickname} />
          <AvatarFallback>
            {playerData.nickname.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className={"flex flex-col gap-2"}>
          {/* ---- Edit Nickname Dialog ---- */}
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Dialog onOpenChange={() => setOpen(!open)} open={open}>
              <DialogTrigger asChild>
                <Button variant={"outline"} className={"p-2 z-10"}>
                  <Pencil className={"w-6"} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className={"text-primary"}>
                    Edit Nickname
                  </DialogTitle>
                </DialogHeader>
                <form
                  className={"flex flex-col gap-4"}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await editFavouriteNickname(
                        playerData.player_id,
                        newNickname,
                      );
                      setFavNickname(newNickname);
                      setOpen(false);
                      toast.info(
                        `Changed ${playerData.nickname}'s nickname to ${newNickname}`,
                      );
                    } catch (err) {
                      toast.error(
                        "Could not change this [nickname], Maybe it already exists?",
                      );
                    }
                  }}
                >
                  <Input
                    maxLength={16}
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                    className={"text-primary"}
                  />
                  <div className={"flex flex-row gap-2 justify-stretch w-full"}>
                    <DialogClose asChild>
                      <Button
                        variant={"outline"}
                        className={"w-full text-primary"}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type={"submit"}
                      variant={"default"}
                      className={"w-full"}
                    >
                      Edit
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Button
            variant={"outline"}
            className={"p-2 z-10"}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* ---- Faceit Profile Button ----*/}
            <Link
              href={"https://www.faceit.com/en/players/" + playerData.nickname}
            >
              <Image
                src="/images/faceit.webp"
                alt="Faceit logo"
                width={20}
                height={20}
              />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="flex flex-row gap-2 items-center">
              {/* ---- Preferred Nickname ---- */}
              <h2 className="text-3xl font-bold truncate max-w-72 whitespace-nowrap overflow-ellipsis">
                {favNickname}
              </h2>
              <FavouriteIcon playerData={playerData} token={token} />
            </div>

            {/* ---- Faceit Username ---- */}
            <p className={"overflow-ellipsis overflow-hidden max-w-64"}>
              @{playerData.nickname}
            </p>

            {/* Faceit Level */}
            <p className="text-muted-foreground">
              Level {playerData.games.cs2.skill_level} |{" "}
              {playerData.games.cs2.faceit_elo} Elo
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FavouriteCard;
