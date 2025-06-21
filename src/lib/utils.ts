import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { parse } from "cookie";
import { GetServerSideProps } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  isLoggedIn: boolean;
};
export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const isLoggedIn = !!cookies.token;

  return {
    props: {
      isLoggedIn,
    },
  };
};
