import { SidebarProvider } from "@/components/ui/sidebar";
import { MemberSidebar } from "@/features/member/components/member-sidebar";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MemberSidebar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
