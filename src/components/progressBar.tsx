"use client"

import { useRef } from "react";
import styled from "styled-components"

interface ProgressBarProps {
    percent: number;
    setPercent: (percent: number) => void;
}

export default function ProgressBar({percent, setPercent}: ProgressBarProps) {
    const barRef = useRef<HTMLDivElement>(null)

    const updatePercent = (clientX: number) => {
        if (!barRef.current) return;
        const bar = barRef.current;
        const barRect = bar.getBoundingClientRect();
        const newPercent = Math.min(
            Math.max(0, Math.floor(((clientX - barRect.left) / barRect.width) * 100)),
            100
        );
        setPercent(newPercent);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        updatePercent(e.touches[0].clientX);

        const handleTouchMove = (moveEvent: TouchEvent) => {
            moveEvent.preventDefault(); 
            updatePercent(moveEvent.touches[0].clientX);
        };

        const handleTouchEnd = () => {
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };

        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", handleTouchEnd);
    };

    return (
        <ProgressBarWrapper ref={barRef} onTouchStart={handleTouchStart}>
            <BarFill style={{ width: `${percent}%` }} />
        </ProgressBarWrapper>
    );
}

const ProgressBarWrapper = styled.div`
    width: 100%;
    height: 30px;
    background-color: #414142;
    border-radius: 30px;
    position: relative;
    cursor: pointer;
    touch-action: none;
`;

const BarFill = styled.div`
    height: 100%;
    background-color: #18E7C1;
    border-radius: 30px;
`;