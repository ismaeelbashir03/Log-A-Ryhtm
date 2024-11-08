import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/providers";
import User from "@/components/user";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar";

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
  title: "Logging",
  description: "", // TODO:
};

type User = {
  nickname: string;
  picture: string;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const s = await getSession();
  if (!s) {
    redirect("/api/auth/login");
    return null;
  }

  const { nickname, picture } = s.user as User;

  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen overflow-hidden`}
        >
          <div className="flex w-full h-full">
            <Sidebar name={nickname} picture={picture} />
            <main className="flex-grow p-3">{children}</main>
          </div>
        </body>
      </Providers>
    </html>
  );
}
