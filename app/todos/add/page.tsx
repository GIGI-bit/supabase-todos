"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import { SubmitButton } from "@/components/submit-button";

export default function AddPage() {
  const handleAdd = async (formData: FormData) => {
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();

    const res = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.ok
      ? toast.success("Todo Added Successfully!!")
      : toast.warn("Failed to add todo!!");
  };

  return (
    <div>
      <form>
        <h1>Create a ToDo!</h1>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Add title for todo"
            required
          />
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            name="description"
            placeholder="Add description for todo"
            required
          />
          <SubmitButton pendingText="Adding todo..." formAction={handleAdd}>
            Add Todo
          </SubmitButton>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
