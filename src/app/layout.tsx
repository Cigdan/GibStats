import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { PlayerSearch } from "@/components/PlayerSearch";
import Image from "next/image";
import Logo from "/public/images/logo.jpg";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Toaster } from "@/components/ui/sonner";
import FaceitButton from "@/components/FaceitButton";
import FaceitAvatar from "@/components/FaceitAvatar";
import { getToken } from "@/lib/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GibStats",
  description: "GibStats suscht schliere Njeri",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  const isLoggedIn = !!token;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://analytics.gibstutz.net/script.js"
          data-website-id={process.env.UMAMI_ID}
        ></script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <header className="border-b fixed z-40 w-screen bg-background">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <a href={"/"}>
              <Button
                  variant={"ghost"}
                  className="flex items-center gap-2 my-0 px-0 pr-2 py-0 h-full"
              >
                <Image
                    className={"rounded"}
                    width={50}
                    height={50}
                    src={Logo}
                    alt={"GibStutz Logo"}
                />
                <span
                    className={
                      "text-2xl font-bold hidden md:inline-block text-secondary-foreground"
                    }
                >
                    GibStats
                  </span>
              </Button>
            </a>

            <div className="flex-1 max-w-md mx-4">
              <PlayerSearch/>
            </div>
            <div className={"flex"}>
              <ThemeSwitch/>
              {isLoggedIn ? (
                  <FaceitAvatar/>
              ) : (
                  <FaceitButton variant={"long"}/>
              )}
            </div>
          </div>
        </header>
        <div className={"pt-16"}>
          {children}
        </div>
        <Toaster/>
      </ThemeProvider>
      </body>
    </html>
  );
}
