import React, { useContext } from "react";
import "./AdminMiddleComp.css";
import { ThemeContext } from "../../context/ThemeContext";

export default function AdminMiddleComp({ children }) {
  const themeContext = useContext(ThemeContext);
  return (
    <div className={`AdminMiddleComp ${themeContext.theme}`}>{children}</div>
  );
}
