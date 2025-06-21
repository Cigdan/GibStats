"use client";
import { SearchIcon, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function PlayerSearch() {
  const idPattern: RegExp =
    /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{3,4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
  const urlPattern: RegExp = /faceit\.com\/.*\/([^\/]+)$/;
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const validateInput = async (userInput: string) => {
    userInput.trim();

    if (userInput.match(idPattern)) {
      return userInput;
    } else if (userInput.match(urlPattern)) {
      const matches = userInput.match(urlPattern);
      if (matches && matches.length > 1) {
        const response = await fetch(`/api/players/getId/${userInput}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } else {
        return userInput;
      }
    }
    const response = await fetch(`/api/players/getId/${userInput}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    return data;
  };
  const searchPlayer = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const userId = await validateInput(input);
      router.push(`/stats/${userId}`);
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={searchPlayer} className="relative w-full">
      {isLoading && (
        <div className="absolute w-full h-full flex justify-center items-center">
          <LoaderCircle className={"text-muted-foreground animate-spin"} />
        </div>
      )}
      {!isLoading && (
        <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      )}
      <Input
        required
        disabled={isLoading}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Username / ID / Faceit URL"
        className="pl-8 text-secondary-foreground"
      />
    </form>
  );
}
