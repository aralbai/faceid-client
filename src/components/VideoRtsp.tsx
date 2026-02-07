"use client";

import { useEffect, useRef } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

export default function VideoRtsp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    playerRef.current = new JSMpeg.Player("ws://127.0.0.1:9999", {
      canvas: canvasRef.current,
      autoplay: true,
    });

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={360}
      style={{ background: "black", borderRadius: 10 }}
    />
  );
}
