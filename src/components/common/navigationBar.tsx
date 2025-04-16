"use client"

import styled from "styled-components"
import { GraphIcon } from "./Icon";
import { HomeIcon } from "./Icon";
import { PersonIcon } from "./Icon";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
    const pathName = usePathname();
    const [, setActiveIndex] = useState<number | null>(null);

    const handleNavClick = (index: number) => {
        setActiveIndex(index);
    }

    return (
        <NavigationBarWrapper>
            <Link href={'/graph'}>
                <IconWrapper $isActive={pathName === '/graph'}  onClick={() => handleNavClick(0)}>
                    <GraphIcon isActive={pathName === '/graph'}/>
                    <span>그래프</span>
                </IconWrapper>
            </Link>
            <Link href={'/'}>
                <IconWrapper $isActive={pathName === '/'} onClick={() => handleNavClick(1)}>
                    <HomeIcon isActive={pathName === '/'}/>
                    <span>홈</span>
                </IconWrapper>
            </Link>
            <Link href={'/mypage'}>
                <IconWrapper $isActive={pathName === '/mypage'} onClick={() => handleNavClick(2)}>
                    <PersonIcon isActive={pathName === '/mypage'}/>
                    <span>마이</span>
                </IconWrapper>
            </Link>
        </NavigationBarWrapper>
    )
}

const NavigationBarWrapper = styled.div`
    position: fixed;
    bottom: 30px;
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