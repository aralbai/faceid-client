"use client";

import { useEffect, useRef } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

export default function VideoRtsp() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const player = new JSMpeg.Player("ws://127.0.0.1:9999", {
      canvas: canvasRef.current,
      autoplay: true,
    });

    return () => {
      if (canvasRef.current) {
        canvasRef.current.destroy(); // yoki close()
        canvasRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width="640"
      height="360"
      style={{ background: "black", borderRadius: "10px" }}
    />
  );
}
