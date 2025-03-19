"use client"

import styled from "styled-components"
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import { Value } from "react-calendar/src/shared/types.js";

interface BottomSheetProps {
    onClose: () => void;
}

export default function BottomSheet({onClose}: BottomSheetProps) {
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const [, setSelectedDate] = useState<string | null>(null);

    const handleDateClick = (value: Value) => {
        if (value instanceof Date) {
            setSelectedDate(value.toLocaleDateString());
            setIsClosing(true);  
            setTimeout(onClose, 300);  
        }
    };

    return (
        <BottomSheetWrapper $isClosing={isClosing}>
            <Wrapper >
                <StyledCalendar 
                    onChange={handleDateClick}
                    formatMonthYear={(locale, date) => {
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    return `${year}.${month}`;}}
                    formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
                    minDetail="month"
                />
            </Wrapper>
        </BottomSheetWrapper>
    )
}

const BottomSheetWrapper = styled.div<{$isClosing: boolean}>`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;
    z-index: 1000;
    animation: ${(props) => (props.$isClosing ? 'fade_down 0.3s ease-out' : 'fade_up 0.3s ease-out')};

    @keyframes fade_up {
        0% { opacity: 0; transform: translateY(100%); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade_down {
        0% { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(100%); }
    }
`;

const Wrapper = styled.div`
    width: 100%;
    padding: 35px;
    background-color: #242424;
    border-radius: 40px 40px 0 0;
    /* animation: fade_up 0.3s ease-out; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const StyledCalendar = styled(Calendar)`
    background-color: #242424;
    color: white;
    border: none;
    width: 100%;
    max-width: 100%;
    .react-calendar__tile {
        color: white;
        font-weight: 400;
        font-family: pretendard;
        font-size: 15px;
        padding: 13px 0;
        width: 40px; 
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0;
    }
    .react-calendar__tile:enabled:hover {
        background-color: none !important;
        background: none !important;
    }
    .react-calendar__tile:enabled:focus {
        background-color: none !important;
        background: none !important;
    }
    .react-calendar__navigation__label__labelText {
        color: white;
        font-weight: 600;
        font-size: 20px;
        font-family: pretendard;
        pointer-events: none !important;
    }
    .react-calendar__navigation__arrow {
        color: white;
    }
    .react-calendar__navigation__next2-button {
        display: none;
    }
    .react-calendar__navigation__prev2-button {
        display: none;
    }
    .react-calendar__month-view__weekdays__weekday {
        > abbr {
            text-decoration: none;
        }
        font-weight: 400;
        font-family: pretendard;
        font-size: 15px;
    }
    .react-calendar__tile--now {
        background: none !important;
        color: white;
        
        > abbr {
            background-color: #18E7C1;
            border-radius: 50%; 
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 32px;
            min-height: 32px;
        }
    }
    .react-calendar__month-view__days__day--neighboringMonth {
        color: rgba(255, 255, 255, 0.5);
    }
    .react-calendar__tile--active {
        background: none !important;
    }
    .react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus {
        background: none !important;
    }
    .react-calendar__navigation button:disabled {
        background: none !important;
    }
`;