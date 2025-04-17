"use client";

import Link from "next/link";
import { useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { DeleteButton } from "@/components/delete-button";

export type Todo = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function HomePage() {
  // const response = await fetch("http://localhost:3000/api/todos");
  // const todos = await response.json();

  const [changeDetected, setChangeDetected] = useState(false);
  const {
    data: todos = [],
    loading,
    error,
  } = useFetchData({
    url: "/api/todos",
    options: { method: "GET" },
    trigger: changeDetected,
  });

  return (
    <div className="w-full h-screen p-10 ">
      <div className="w-full flex justify-between">
        <h1 className="text-bold text-xl">Todo</h1>
        <Link className="bg-black text-white  px-4 py-3 rounded" href="add">
          Add Todo
        </Link>
      </div>
      <div className="flex gap-5">
        {todos?.map((todo: Todo) => (
          <div className="p-5 w-fit border border-black-500" key={todo.id}>
            <h1>{todo.title}</h1>
            <p>{todo.description} </p>
            <div className="mt-2 flex gap-2">
              <DeleteButton
                id={todo.id}
                setChangeDetected={setChangeDetected}
              ></DeleteButton>
              <Link href={`edit/${todo.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
