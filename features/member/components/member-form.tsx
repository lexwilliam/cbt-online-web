"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useInsertMember } from "../api/insert-member";
import { useUpdateMember } from "../api/update-member";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { UserInput, userSchema } from "@/lib/validations/member";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { User } from "@/prisma/generated/client";
import { Button } from "@/components/ui/button";
import { useDeleteMember } from "../api/delete-member";

interface MemberFormProps {
  member?: User;
  onSuccess?: () => void;
}

export default function MemberForm({
  member,
  onSuccess,
}: MemberFormProps = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const insertMember = useInsertMember({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Berhasil menambahkan member");
        onSuccess?.();
      },
    },
  });
  const updateMember = useUpdateMember({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Berhasil mengupdate member");
        onSuccess?.();
      },
    },
  });

  const deleteMember = useDeleteMember({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Berhasil menghapus member");
        onSuccess?.();
      },
    },
  });

  const form = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: member?.id ?? crypto.randomUUID(),
      name: member?.name ?? "",
      email: member?.email ?? "",
      password: member?.password,
      role: member?.role ?? "USER",
    },
  });

  async function handleSubmit(data: UserInput) {
    setIsLoading(true);
    try {
      if (member) {
        await updateMember.mutateAsync({ data: data });
      } else {
        await insertMember.mutateAsync({ data: data });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!member) return;
    await deleteMember.mutateAsync({ id: member.id });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Masukkan nama" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Masukkan email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!member && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukkan kata sandi"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {/* Display form-level errors */}
        <div className="text-sm text-red-500">
          {Object.values(form.formState.errors).map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </div>
        <div className="flex flex-row sm:justify-end gap-2">
          <Button className="flex-1" type="submit">
            {isLoading ? "Loading..." : "Simpan"}
          </Button>
          {member && (
            <Button type="button" variant={"destructive"} onClick={handleDelete}>
              Hapus
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
