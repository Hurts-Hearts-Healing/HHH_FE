"use client"

import NavigationBar from "@/components/common/navigationBar";
import styled from "styled-components"
import Image from "next/image";
import PrevDayArrow from "../../../assets/imgs/mypage/prevDayArrow.svg";
import NextDayArrow from "../../../assets/imgs/mypage/nextDayArrow.svg";
import Sad from "../../../assets/imgs/home/sad.svg";
import Happy from "../../../assets/imgs/home/happy.svg";
import Soso from "../../../assets/imgs/home/soso.svg";
import { useEffect, useState } from "react";
import { viewDiary, viewEmotionEmoji } from "@/apis/diary";
import { ViewDiaryResponseArray, ViewEmotionEmojiResponseArray } from "@/apis/diary/type";
import Warning from "../../../assets/imgs/mypage/warning.svg";

export default function DiaryCollection() {
    const [date, setDate] = useState(new Date());
    const [diaries, setDiaries] = useState<ViewDiaryResponseArray[]>([]);
    const [emotions, setEmotions] = useState<ViewEmotionEmojiResponseArray[]>([]);
    const [todayEmotion, setTodayEmotion] = useState<ViewEmotionEmojiResponseArray | null>(null);
    const [todayDiary, setTodayDiary] = useState<ViewDiaryResponseArray | null>(null);

    const formatDate = (date: Date, withDot = true) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return withDot ? `${year}.${month}.${day}` : `${year}-${month}-${day}`;
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

    useEffect(() => {
        const fetchDiary = async () => {
            try {
                const res = await viewDiary();
                setDiaries(res.data.diaries);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDiary();
    }, [])

    useEffect(() => {
        if (!diaries || diaries.length === 0) return;
    
        const todayStr = formatDate(date, false);
        const found = diaries.find(diary => diary.createdAt === todayStr);
        setTodayDiary(found ?? null);
    }, [date, diaries]);

    useEffect(() => {
        const fetchEmotions = async () => {
            try {
                const res = await viewEmotionEmoji();
                setEmotions(res.data.emotionList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEmotions();
    }, []);
    
    useEffect(() => {
        if (!emotions || emotions.length === 0) return;
    
        const todayStr = formatDate(date, false);
        const foundEmotion = emotions.find(emotion => emotion.createdAt === todayStr);
        setTodayEmotion(foundEmotion ?? null);
    }, [date, emotions]);

    const getEmotionImage = (emotion: string) => {
        switch (emotion) {
            case "HAPPY":
                return Happy;
            case "SOSO":
                return Soso;
            case "SAD":
                return Sad;
        }
    };
    
    return (
        <Wrapper>
            <HeadWrapper>
                <Image src={PrevDayArrow} alt="<" onClick={handlePrevDay}/>
                <DayBox>{formatDate(date)}</DayBox>
                <Image src={NextDayArrow} alt=">" onClick={handleNextDay}/>
            </HeadWrapper>
            <ContainerWrapper>
                {todayEmotion && (
                    <Image src={getEmotionImage(todayEmotion?.emotion)} alt={todayEmotion?.emotion}/>
                )}
                {todayDiary ? (
                    <>
                        <h3>{todayDiary.title}</h3>
                        <Line />
                        <ContentBox>
                        <Content>{todayDiary.note}</Content>
                        </ContentBox>
                    </>
                    ) : (
                    !todayEmotion ? (
                        <NoDiaryWrapper>
                        <Image src={Warning} alt="경고" />
                        <p>작성된 일기가 없습니다</p>
                        </NoDiaryWrapper>
                    ) : (
                        <>
                        <h3>제목 없음</h3>
                        <Line />
                        <ContentBox>
                            <Content>작성된 내용이 없습니다</Content>
                        </ContentBox>
                        </>
                    )
                )}
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
    padding-bottom: 104px;
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
    > h3 {
        font-weight: 700;
        font-weight: 22px;
    }
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
    flex: 1;
`;

const Content = styled.div`
    width: 100%;
    font-size: 15px;
    color: white;
    overflow-y: auto;
    line-height: 25px;
`;

const NoDiaryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100%;
`;