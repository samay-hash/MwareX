"use client";

import { useEffect, useRef } from 'react';

export default function BackgroundParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        // Offset for the subtle movement "here and there"
        let offsetX = 0;
        let offsetY = 0;

        // Configuration
        const GRID_SIZE = 40; // Size of the grid squares
        const LINE_COLOR = 'rgba(250, 204, 21, 0.1)'; // Subtle Light Yellow
        const SPOTLIGHT_RADIUS = 300; // Size of the mouse spotlight
        const DRIFT_SPEED = 0.2; // How fast the grid moves

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const animate = () => {
            if (!ctx || !canvas) return;

            // Update Grid Position (Slow Drift)
            offsetX += DRIFT_SPEED;
            offsetY += DRIFT_SPEED * 0.5;

            // Reset offsets to keep them within grid bounds (infinite scroll illusion)
            if (offsetX > GRID_SIZE) offsetX = 0;
            if (offsetY > GRID_SIZE) offsetY = 0;

            // Clear Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create a gradient for the mask (Vignette + Mouse Spotlight)
            // We do this by filling the screen with black, then cutting out the grid? 
            // No, easier to draw the grid with a dynamic transparency based on distance from mouse.

            const width = canvas.width;
            const height = canvas.height;

            ctx.beginPath();
            ctx.strokeStyle = LINE_COLOR;
            ctx.lineWidth = 1;

            // Draw Vertical Lines
            for (let x = offsetX % GRID_SIZE; x < width; x += GRID_SIZE) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }

            // Draw Horizontal Lines
            for (let y = offsetY % GRID_SIZE; y < height; y += GRID_SIZE) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }

            // Render the faint base grid
            ctx.stroke();

            // --- SPOTLIGHT EFFECT ---
            // We want the grid to "glow" brighter near the mouse.
            // We can achieve this by drawing a radial gradient over the grid using "lighter" blend mode,
            // Or by redrawing the grid lines near the mouse with higher opacity.
            // Let's use a composite operation to "light up" the grid.

            const gradient = ctx.createRadialGradient(
                mouseRef.current.x,
                mouseRef.current.y,
                0,
                mouseRef.current.x,
                mouseRef.current.y,
                SPOTLIGHT_RADIUS
            );

            // The spotlight color - slightly brighter yellow
            gradient.addColorStop(0, 'rgba(253, 224, 71, 0.15)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        // Start
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
            {/* Base darker grid (static faint layer if needed, but canvas handles it) */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Vignette Overlay for extra "Cool" factor */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, #050505 100%)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
}
