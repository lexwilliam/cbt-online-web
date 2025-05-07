"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MemberList from "@/features/member/components/member-list";
import { useState } from "react";

export default function MemberPage() {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

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
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new member.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Add form fields here */}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddMemberOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <MemberList />
    </div>
  );
}
