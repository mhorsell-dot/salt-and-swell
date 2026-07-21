"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function update(key: keyof typeof form, value: string) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();

      setError(data.error || "Registration failed");

      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] flex items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-3xl font-semibold">Create account</h1>

        <input
          className="mt-8 w-full border p-4"
          placeholder="First name"
          onChange={(e) => update("firstName", e.target.value)}
        />

        <input
          className="mt-4 w-full border p-4"
          placeholder="Last name"
          onChange={(e) => update("lastName", e.target.value)}
        />

        <input
          className="mt-4 w-full border p-4"
          placeholder="Email"
          type="email"
          onChange={(e) => update("email", e.target.value)}
        />

        <input
          className="mt-4 w-full border p-4"
          placeholder="Password"
          type="password"
          onChange={(e) => update("password", e.target.value)}
        />

        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

        <button className="mt-6 w-full bg-black p-4 text-white">Create account</button>
      </form>
    </main>
  );
}
