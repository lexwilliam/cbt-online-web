"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RoomInput, roomSchema } from "@/lib/validations/room";
import { useInsertRoom } from "../api/insert-room";
import { useUpdateRoom } from "../api/update-room";
import { Room } from "@/prisma/generated/client";

interface RoomFormProps {
  room?: Room;
  onSuccess?: () => void;
}

export default function RoomForm({ room, onSuccess }: RoomFormProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const insertRoom = useInsertRoom({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Room added successfully");
        onSuccess?.();
      },
    },
  });

  const updateRoom = useUpdateRoom({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Room updated successfully");
        onSuccess?.();
      },
    },
  });

  const form = useForm<RoomInput>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      url: room?.url ?? "",
      exit_key: room?.exit_key ?? "",
    },
  });

  async function handleSubmit(data: RoomInput) {
    setIsLoading(true);
    if (room) {
      updateRoom.mutate({
        id: room.id,
        data: data,
      });
    } else {
      insertRoom.mutate({
        data: data,
      });
    }
    setIsLoading(false);
  }

  async function handleDelete() {
    if (!room) return;
    try {
      // TODO: Implement delete mutation logic
      toast.success("Room deleted successfully");
      onSuccess?.();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete room");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter room URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exit_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exit Key</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter exit key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-sm text-red-500">
          {Object.values(form.formState.errors).map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </div>
        <div className="flex flex-row sm:justify-end gap-2">
          <Button className="flex-1" type="submit">
            {isLoading ? "Loading..." : "Save"}
          </Button>
          {room && (
            <Button
              type="button"
              variant={"destructive"}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
