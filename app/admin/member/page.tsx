"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetAllMember } from "@/features/member/api/get-all-member";
import MemberForm from "@/features/member/components/member-form";
import MemberList from "@/features/member/components/member-list";
import { useState } from "react";

export default function MemberPage() {
  const members = useGetAllMember({});

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  function handleFormSuccess() {
    setIsAddMemberOpen(false)
    members.refetch();
  }

  function handleListSuccess() {
    members.refetch();
  }

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <div className="flex flex-row gap-4 items-center">
        <SidebarTrigger />
        <span className="text-xl font-bold">Member List</span>
        <div className="flex flex-grow" />
        <div className="flex justify-end">
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddMemberOpen(true)}>
                Tambah Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Member Baru</DialogTitle>
                <DialogDescription>
                  Silahkan isi data member baru di bawah ini
                </DialogDescription>
              </DialogHeader>
              <MemberForm onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <MemberList members={members.data ?? []} onSuccess={handleListSuccess} />
    </div>
  );
}
