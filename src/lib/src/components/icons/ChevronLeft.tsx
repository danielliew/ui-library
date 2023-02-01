import React from "react";

function ChevronLeft() {
  return (
    <svg
      height="100%"
      viewBox="0 0 24 24"
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      style={{
        paddingLeft: "25%"
      }}
    >
      <path
        fillRule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
  );
}

export default ChevronLeft;
