import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import AnimatedGradient from "@/components/animated-gradient-with-svg";
import "./globals.css";
import Transition from "@/components/transition";
import Link from "next/link";
import { StageStoreProvider } from "@/store/store";
import { AppName } from "@/components/app-name";

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aurora",
  description: "Let your mood be yout DJ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // @TODO: Add orange-blue support
        className={`${font.className}`}
      >
        <div className="min-w-full min-h-screen bg-orange-50 rounded-xl antialiased">
          <StageStoreProvider>
            <AppName />
            {children}
            <Transition latency={0.8} className="fixed bottom-6 right-6">
              <footer className="flex justify-center items-center gap-2 opacity-50 hover:opacity-100 transition-opacity px-4 py-2 bg-slate-100 border-slate-200 rounded-full">
                <Link href="https://gokyalc.in" target="_blank">
                  A. Göktuğ Yalçın
                </Link>{" "}
                -{" "}
                <span className="font-semibold">
                  {new Date().getFullYear()}
                </span>
              </footer>
            </Transition>
          </StageStoreProvider>
        </div>
      </body>
    </html>
  );
}
