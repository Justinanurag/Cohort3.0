import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const session=useSession();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Hello!!
      {session.status==="authenticated"? "Logout":"Sign in"}
    </div>
  );
}
