import React from "react";
import "./header.css";

export default function Header() {
  return (
    <div>
      <span onClick={() => window.scroll(0, 0)} className="header">
        🎬 Entertainment Hub 🎥
      </span>
    </div>
  );
}
