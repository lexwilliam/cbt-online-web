"use client";

import { Button } from "@/components/ui/button";
import { useGetAllMember } from "../api/get-all-member";
import { useState } from "react";

export default function MemberList() {
  const members = useGetAllMember({});

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.data?.map((member) => (
          <div key={member.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-600">{member.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
