import Navbar from "@/components/blocks/navbar/navbar";
import { Sidebar } from "@/components/blocks/sidebar/sidebar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />

        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <div className="flex w-full">
          <Sidebar />
          <div className="flex flex-col w-full">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
