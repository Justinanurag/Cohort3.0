import Link from "next/link"

export default function Home() {
  return (
    <div className="text-lg w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold">ToDo Application</h1>

        <div className="flex items-center gap-6 text-base">
          <Link className="underline hover:text-blue-600 transition" href="/signin">
            Sign In
          </Link>

          <Link className="underline hover:text-blue-600 transition" href="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
 