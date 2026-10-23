import { useEffect, useRef } from 'react';

/** A discreet two-element custom cursor (dot + ring) for desktop only. */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      raf = requestAnimationFrame(loop);
    };

    const onEnterInteractive = () => document.body.classList.add('cursor-hover');
    const onLeaveInteractive = () => document.body.classList.remove('cursor-hover');

    const interactive = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .card-glow, .portfolio-item');
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
