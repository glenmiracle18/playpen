import { Header } from "@/components/blocks/header/header";
import { Sidebar } from "@/components/blocks/sidebar/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
