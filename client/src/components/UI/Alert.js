import React from "react";

export default function Alert({ color, message }) {
  return (
    <div
      className={`text-white px-2 py-2 border rounded relative mb-4 border-${color}-600 text-${color}-500`}
    >
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-bell" />
      </span>
      <span className="inline-block align-middle mr-8 break-words break-all">
        {message}
      </span>
    </div>
  );
}
