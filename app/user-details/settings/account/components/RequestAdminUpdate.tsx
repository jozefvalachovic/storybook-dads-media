"use client";

import Link from "next/link";
import { useState } from "react";

export const RequestAdminUpdate = () => {
  function handleRequestChangeEmail() {}

  const [confirmRequestDeactivate, setConfirmRequestDeactivate] = useState(false);
  function handleRequestDeactivate() {
    setConfirmRequestDeactivate(!confirmRequestDeactivate);
    if (confirmRequestDeactivate) {
      console.log("Delete");
    } else {
      setTimeout(() => setConfirmRequestDeactivate(false), 3_000);
    }
  }

  return (
    <div className="w-[var(--app-width-min)] flex flex-col gap-4 mt-auto">
      <Link
        href="/user-details/settings/account/change-password"
        className="btn w-full flex justify-center !bg-[#6750a41f] p-3 rounded-xl !border-[#6750a41f]"
      >
        <p>Change Password</p>
      </Link>
      <button
        className="w-full flex justify-center !bg-[#6750a41f] p-3 rounded-xl border border-[#6750a41f]"
        onClick={handleRequestChangeEmail}
      >
        <p>Request to Change Email</p>
      </button>
      <h2 className="w-full text-dark-grey">Danger Zone</h2>
      <button
        className={`w-full flex justify-center !bg-[#6750a41f] p-3 rounded-xl !border ${
          confirmRequestDeactivate ? "!border-error" : "!border-transparent"
        }`}
        onClick={handleRequestDeactivate}
      >
        <p className="!text-error">
          {confirmRequestDeactivate ? "Are you sure?" : "Request to Deactivate Account"}
        </p>
        {confirmRequestDeactivate && <p className="font-semibold !text-light-red ml-1">Confirm</p>}
      </button>
    </div>
  );
};
