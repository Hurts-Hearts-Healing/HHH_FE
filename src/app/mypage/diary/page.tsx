"use client"

import NavigationBar from "@/components/common/navigationBar";
import styled from "styled-components"
import Image from "next/image";
import PrevDayArrow from "../../../assets/imgs/mypage/prevDayArrow.svg";
import NextDayArrow from "../../../assets/imgs/mypage/nextDayArrow.svg";
import { useState } from "react";

export default function DiaryCollection() {
    const [date, setDate] = useState(new Date());

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
    };
    
    const handlePrevDay = () => {
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    };

    const handleNextDay = () => {
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + 1);
            return newDate
        })
    }
    
    return (
        <Wrapper>
            <HeadWrapper>
                <Image src={PrevDayArrow} alt="<" onClick={handlePrevDay}/>
                <DayBox>{formatDate(date)}</DayBox>
                <Image src={NextDayArrow} alt=">" onClick={handleNextDay}/>
            </HeadWrapper>
            <ContainerWrapper>
                <Emoji />
                <h3>제목</h3>
                <Line />
                <ContentBox>
                    <Content>내용</Content>
                </ContentBox>
            </ContainerWrapper>
            <NavigationBar />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
    height: 100vh;
    width: 100%;
    align-items: center;
`;

const HeadWrapper = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
    margin-top: 23px;
`;

const DayBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid white;
`;

const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    padding-bottom: 79px;
    > h3 {
        font-weight: 700;
        font-weight: 22px;
    }
`;

const Emoji = styled.div`
    width: 44px;
    height: 44px;
    background-color: white;
    flex-shrink: 0;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #414142;
`;

const ContentBox = styled.div`
    padding: 20px;
    width: 100%;
    background-color: #414142;
    border-radius: 20px;
    height: calc(100vh - 40px - 79px - 30px - 100px - 55px); 
`;

const Content = styled.div`
    width: 100%;
    font-size: 15px;
    color: white;
    overflow-y: auto;
    line-height: 25px;
    height: 100%;
`;