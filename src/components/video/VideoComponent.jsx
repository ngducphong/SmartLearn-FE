import React from "react";

export default function VideoComponent({ sourceVideo }) {
  return (
    <div className="w-full h-full">
      {" "}
      <iframe
        width="100%"
        height="610px"
        src={sourceVideo}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
}
