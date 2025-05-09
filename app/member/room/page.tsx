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
import RoomForm from "@/features/room/components/room-form";
import RoomList from "@/features/room/components/room-list";
import { useState } from "react";
import { useGetAllRoom } from "@/features/room/api/get-all-room";

export default function RoomPage() {
  const rooms = useGetAllRoom({});

  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

  function handleFormSuccess() {
    setIsAddRoomOpen(false);
    rooms.refetch();
  }

  function handleListSuccess() {
    rooms.refetch();
  }

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <div className="flex flex-row gap-4 items-center">
        <span className="text-xl font-bold">Room List</span>
        <div className="flex flex-grow" />
        <div className="flex justify-end">
          <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddRoomOpen(true)}>Add Room</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
                <DialogDescription>
                  Please fill in the room details below
                </DialogDescription>
              </DialogHeader>
              <RoomForm onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <RoomList rooms={rooms.data ?? []} onSuccess={handleListSuccess} />
    </div>
  );
}
