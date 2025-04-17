"use client";
import { useState, useEffect } from "react";

import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Todo } from "../../home/page";

type EditButtonProps = {
  params: Promise<{
    id: number;
  }>;
};

const EditPage = ({ params }: EditButtonProps) => {
  const [id, setId] = useState<number | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
      console.log("in unwrap");
      console.log(id);
    }
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (id) getTodo(); ///question!!
  }, [id]);

  const getTodo = async () => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`);
    const todo = await response.json();
    setTodo(todo);
  };

  const handleEdit = async (formData: FormData) => {
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  };

  return (
    <div>
      <form>
        <h1>Edit your ToDo!</h1>
        <Label htmlFor="title">Title</Label>
        <Input
          defaultValue={todo?.title}
          type="text"
          name="title"
          placeholder="Enter Title"
          required
        />
        <Label htmlFor="description">Description</Label>
        <Input
          defaultValue={todo?.description}
          type="text"
          name="description"
          placeholder="Add description for todo"
          required
        />
        <SubmitButton pendingText="Editing Todo..." formAction={handleEdit}>
          Edit Todo
        </SubmitButton>
      </form>
    </div>
  );
};

export default EditPage;
