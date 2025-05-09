"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser, useLogout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function LogoutButton() {
  const router = useRouter();
  const { mutate: logout } = useLogout({
    onSuccess: () => router.push("/auth/login"),
  });

  return (
    <Button className="w-full" variant={"destructive"} onClick={() => logout()}>
      Logout
    </Button>
  );
}

export function AdminSidebar() {
  const { data: user, isLoading } = useUser();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-col gap-2 p-2 ">
          {isLoading ? (
            <div className="h-12 animate-pulse rounded-md bg-sidebar-accent/50" />
          ) : (
            <>
              <div className="text-lg font-semibold">{user?.name}</div>
              <div className="text-sm text-sidebar-foreground/70">
                {user?.email}
              </div>
            </>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem key={"member"}>
              <SidebarMenuButton asChild>
                <a href={"/admin/member"}>
                  <span>{"Members"}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem key={"info"}>
              <SidebarMenuButton asChild>
                <a href={"/admin/info"}>
                  <span>{"Info"}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4 border-t border-sidebar-accent">
        <LogoutButton />
      </div>
    </Sidebar>
  );
}
