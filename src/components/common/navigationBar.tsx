"use client"

import styled from "styled-components"
import Image from "next/image";
import Graph from "../../assets/imgs/navigation/graph.svg";
import Home from "../../assets/imgs/navigation/home.svg";
import Person from "../../assets/imgs/navigation/person.svg";
import { GraphIcon } from "./Icon";
import { HomeIcon } from "./Icon";
import { PersonIcon } from "./Icon";
import { useState } from "react";

export default function NavigationBar() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleNavClick = (index: number) => {
        setActiveIndex(index);
    }

    return (
        <NavigationBarWrapper>
            <IconWrapper $isActive={activeIndex === 0} onClick={() => handleNavClick(0)}>
                <GraphIcon isActive={activeIndex === 0}/>
                <span>그래프</span>
            </IconWrapper>
            <IconWrapper $isActive={activeIndex === 1} onClick={() => handleNavClick(1)}>
                <HomeIcon isActive={activeIndex === 1}/>
                <span>홈</span>
            </IconWrapper>
            <IconWrapper $isActive={activeIndex === 2} onClick={() => handleNavClick(2)}>
                <PersonIcon isActive={activeIndex === 2}/>
                <span>마이</span>
            </IconWrapper>
        </NavigationBarWrapper>
    )
}

const NavigationBarWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #414142;
    border-radius: 100px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    height: 49px;
    width: auto;
    justify-content: space-between;
    padding-left: 35px;
    padding-right: 35px;
`;

const IconWrapper = styled.div<{$isActive: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35px;
    gap: 4px;
    > span {
        color: ${({$isActive}) => $isActive ? "#18E7C1" : "#DEDEDE"};
        font-size: 10px;
        font-weight: 600;
    }
`;