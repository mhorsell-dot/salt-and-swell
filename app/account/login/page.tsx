"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed");
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] flex items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-3xl font-semibold">Welcome back</h1>

        <p className="mt-3 text-sm text-black/50">Sign in to your Salt & Swell account.</p>

        <input
          className="mt-8 w-full border p-4"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mt-4 w-full border p-4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button className="mt-6 w-full bg-black p-4 text-white">Sign in</button>

        <Link href="/account/register" className="mt-6 block text-center text-sm underline">
          Create account
        </Link>
      </form>
    </main>
  );
}
