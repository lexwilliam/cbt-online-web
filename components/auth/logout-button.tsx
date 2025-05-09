import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useLogout } from "@/lib/auth";

export default function LogoutButton() {
  const router = useRouter();
  const { mutate: logout } = useLogout({
    onSuccess: () => router.push("/auth/login"),
  });

  return (
    <Button className="w-full" variant={"destructive"} onClick={() => logout()}>
      Logout
    </Button>
  );
}
