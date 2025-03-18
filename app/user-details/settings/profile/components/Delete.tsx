"use client";

import { useState } from "react";

export const Delete = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  function handleDelete() {
    setConfirmDelete(!confirmDelete);
    if (confirmDelete) {
      console.log("Delete");
    } else {
      setTimeout(() => setConfirmDelete(false), 3_000);
    }
  }

  return (
    <div className="w-[var(--app-width-min)] mt-auto">
      <h2 className="w-full text-dark-grey mb-4">Danger Zone</h2>
      <button
        className={`w-full flex justify-center !bg-[#6750a41f] p-3 rounded-xl !border ${
          confirmDelete ? "!border-error" : "!border-transparent"
        }`}
        onClick={handleDelete}
      >
        <p className="!text-error">{confirmDelete ? "Are you sure?" : "Delete"}</p>
        {confirmDelete && <p className="font-semibold !text-light-red ml-1">Confirm</p>}
      </button>
    </div>
  );
};
