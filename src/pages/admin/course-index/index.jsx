import React, { useState } from "react";
import "./index.css";
import Course from "../course";

export default function CourseIndex() {
  return (
    <>
      <div className="px-6 py-3 flex flex-col  w-full">
        <Course />
      </div>
    </>
  );
}
