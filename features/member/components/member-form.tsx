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
import { User } from "@/types/api";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface MemberFormProps {
  member?: User;
}

export default function MemberForm({ member }: MemberFormProps = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const insertMember = useInsertMember({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Berhasil menambahkan member");
      },
    },
  });
  const updateMember = useUpdateMember({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Berhasil mengupdate member");
      },
    },
  });

  const form = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: member?.id ?? "",
      name: member?.name ?? "",
      email: member?.email ?? "",
      role: member?.role ?? "USER",
      created_at: member?.created_at ?? new Date(),
      group_id: member?.group_id,
    },
  });

  function onSubmit(data: UserInput) {
    if (member) {
      updateMember.mutate({ data: data });
    } else {
      insertMember.mutate({ data: data });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
      </form>
    </Form>
  );
}
