"use client";

import LogoutButton from "@/components/auth/logout-button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/lib/auth";

export function MemberSidebar() {
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
            <SidebarMenuItem key={"/member/room"}>
              <SidebarMenuButton asChild>
                <a href={"/member/room"}>
                  <span>{"Rooms"}</span>
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
