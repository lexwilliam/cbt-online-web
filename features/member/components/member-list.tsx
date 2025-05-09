"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import MemberForm from "./member-form";
import { User } from "@/prisma/generated/client";

export type MemberListProps = {
  members: User[];
  onSuccess?: () => void;
};

export default function MemberList({ members, onSuccess }: MemberListProps) {
  const [selectedMember, setSelectedMember] = useState<User | null>(null);

  const handleSuccess = () => {
    setSelectedMember(null);
    onSuccess?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members?.length > 0 ? (
          members.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.email}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No members found
          </div>
        )}
      </div>
      <Dialog
        open={selectedMember != null}
        onOpenChange={() => setSelectedMember(null)}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Silahkan edit member di bawah ini
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <MemberForm onSuccess={handleSuccess} member={selectedMember} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
