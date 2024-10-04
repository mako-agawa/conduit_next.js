
"use client";


import { useRouter } from "next/navigation";
import React from "react";

const DeleteButton = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    // console.log(id);

    // await deleteArticle(id);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    console.log(res)

    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white hover:bg-red-600 rounded-md py-2 px-5"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
