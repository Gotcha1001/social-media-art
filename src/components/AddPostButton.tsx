"use client";

import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-indigo-600 mt-3 text-white px-3 py-2 rounded-lg disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          <span>Sending...</span>
        </div>
      ) : (
        "Send"
      )}
    </button>
  );
};

export default AddPostButton;
