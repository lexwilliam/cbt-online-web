"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { useGetInfo } from "@/features/info/api/get-info";
import { useUpdateInfo } from "@/features/info/api/update-info";
import { infoForm, InfoInput } from "@/lib/validations/info";
import { zodResolver } from "@hookform/resolvers/zod";
import router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function InfoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const info = useGetInfo({});
  const updateInfo = useUpdateInfo({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Berhasil mengupdate info");
      },
    },
  });

  const form = useForm<InfoInput>({
    resolver: zodResolver(infoForm),
    defaultValues: {
      aturan: "",
      info: "",
    },
  });

  useEffect(() => {
    if (info.data) {
      form.reset({
        aturan: info.data.aturan,
        info: info.data.info,
      });
    }
  }, [info.data, form]);

  function handleSubmit(data: InfoInput) {
    setIsLoading(true);
    updateInfo.mutate({ data: data });
    setIsLoading(false);
  }

  return (
    <div>
      {info.isLoading ? (
        <div className="p-4"></div>
      ) : (
        <div className="flex flex-col w-full gap-4 p-4">
          <div className="flex flex-row gap-4 items-center">
            <SidebarTrigger />
            <span className="text-xl font-bold">Information</span>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="aturan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rules</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="info"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Information</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                {isLoading ? "Loading..." : "Simpan"}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
