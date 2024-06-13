import React from "react";

export default function VideoComponent({ sourceVideo }) {
    return (
        <div className="w-full h-full">
            <video
                src={sourceVideo}
                controls
                style={{ width: "100%", height: "610px", border: 0 }}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
