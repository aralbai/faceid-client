// src/types/jsmpeg-player.d.ts
declare module "@cycjimmy/jsmpeg-player" {
  interface JSMpegPlayerOptions {
    canvas?: HTMLCanvasElement | null;
    autoplay?: boolean;
    loop?: boolean;
    audio?: boolean;
    video?: boolean;
    pauseWhenHidden?: boolean;
  }

  class Player {
    constructor(url: string, options?: JSMpegPlayerOptions);
    destroy(): void;
    play(): void;
    pause(): void;
    stop(): void;
  }

  const JSMpeg: {
    Player: typeof Player;
  };

  export default JSMpeg;
}
