type DeleteButtonProps = {
  setChangeDetected: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  setChangeDetected,
  id,
}) => {
  const handleDelete = async (id: number) => {
    setChangeDetected((prev) => !prev);
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      // toast.success("Todo deleted successfully");
      console.log("good");
    } else {
      // toast.error("Error deleting todo");
      console.log("error");
    }
  };

  return (
    <button onClick={() => handleDelete(id)}>
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
          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        />
      </svg>
    </button>
  );
};
