"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RoomInput } from "@/lib/validations/room";
import { Room } from "@/prisma/generated/client";
import { useState } from "react";
import RoomForm from "./room-form";

export type RoomListProps = {
  rooms: Room[];
  onSuccess?: () => void;
};

export default function RoomList({ rooms, onSuccess }: RoomListProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleSuccess = () => {
    setSelectedRoom(null);
    onSuccess?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms?.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{room.url}</h3>
              <p className="text-gray-600">Exit Key: {room.exit_key}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No rooms found
          </div>
        )}
      </div>
      <Dialog
        open={selectedRoom != null}
        onOpenChange={() => setSelectedRoom(null)}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
            <DialogDescription>
              Please edit the room details below
            </DialogDescription>
          </DialogHeader>
          {selectedRoom && (
            <RoomForm onSuccess={handleSuccess} room={selectedRoom} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
