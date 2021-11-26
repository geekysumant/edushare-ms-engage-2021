import React from "react";

export default function Alert({ color, message }) {
  return (
    <div
      style={{
        fontFamily: ["Sen", "sans-serif"],
      }}
      className={`text-lg font-semibold px-2 py-2 border rounded relative mb-4 bg-${color}-500 text-white`}
    >
      <span className="inline-block align-middle mr-8 break-words break-all">
        {message}
      </span>
    </div>
  );
}
