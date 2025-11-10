"use client";

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <RealHome />
    </SessionProvider>
  );
}

function RealHome() {
  const session = useSession();

return (
  <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-4">
    <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-10 flex flex-col items-center gap-6 max-w-sm w-full">
      <h1 className="text-3xl font-semibold">Welcome 👋</h1>

      <p className="text-zinc-500 dark:text-zinc-400 text-center">
        {session.status === "authenticated"
          ? `You are logged in`
          : `Please login to continue`}
      </p>

      {session.status === "authenticated" && (
        <button
          onClick={() => signOut()}
          className="px-6 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition w-full font-medium"
        >
          Logout
        </button>
      )}

      {session.status === "unauthenticated" && (
        <button
          onClick={() => signIn()}
          className="px-6 py-2 rounded-xl bg-black text-white hover:opacity-80 transition w-full font-medium"
        >
          Login
        </button>
      )}
    </div>
  </div>
);
 
}
