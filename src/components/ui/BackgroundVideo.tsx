'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>('/hero-bg-1080p.mp4');

  useEffect(() => {
    // Select the best video source based on screen width on client mount
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setVideoSrc('/hero-bg-mobile.mp4');
    } else {
      setVideoSrc('/hero-bg-1080p.mp4');
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Force muted properties on the real DOM element (crucial for Chrome/Edge/Safari autoplay)
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    // 2. Playback helper with user-interaction fallback
    const startPlayback = () => {
      if (!video) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy paused autoplay, resume immediately on first interaction
          const resume = () => {
            if (video) {
              video.muted = true;
              video.play().catch(() => {});
            }
          };
          window.addEventListener('click', resume, { once: true });
          window.addEventListener('touchstart', resume, { once: true });
          window.addEventListener('scroll', resume, { once: true });
          window.addEventListener('mousemove', resume, { once: true });
        });
      }
    };

    startPlayback();

    // 3. Fallback seamless loop: explicitly seek to beginning and play when ended
    const handleEnded = () => {
      if (video) {
        video.currentTime = 0;
        startPlayback();
      }
    };
    video.addEventListener('ended', handleEnded);

    // 4. Resume playback on tab focus or visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden && video && video.paused) {
        startPlayback();
      }
    };
    const handleFocus = () => {
      if (video && video.paused) {
        startPlayback();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // 5. Anti-Stall Watchdog: monitor currentTime to detect frozen/stuck video frames
    let lastTime = -1;
    let stuckCount = 0;
    const watchdog = setInterval(() => {
      if (!video || document.hidden) return;

      const currentTime = video.currentTime;
      if (video.paused) {
        startPlayback();
      } else if (currentTime === lastTime && currentTime > 0) {
        // Video currentTime has not progressed while playing -> it is stuck on a frame
        stuckCount++;
        if (stuckCount >= 2) {
          // Nudge playback forward or restart seamless loop
          video.currentTime = (currentTime + 0.1) % (video.duration || 10);
          startPlayback();
          stuckCount = 0;
        }
      } else {
        stuckCount = 0;
        lastTime = currentTime;
      }
    }, 1500);

    return () => {
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      clearInterval(watchdog);
    };
  }, [videoSrc]);

  return (
    <video
      ref={videoRef}
      key={videoSrc}
      src={videoSrc}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
        top: 0,
        left: 0,
        transform: 'scale(1.05) translate3d(0, 0, 0)',
        willChange: 'transform',
        pointerEvents: 'none',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    />
  );
}
