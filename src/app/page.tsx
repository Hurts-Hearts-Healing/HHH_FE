"use client";

import styled from "styled-components";
import ContentInput from "@/components/home/contentInput";
import NavigationBar from "@/components/common/navigationBar";
import Image from "next/image";
import Logo from "../assets/imgs/logo.svg";
import Happy from "../assets/imgs/home/happy.svg";
import Soso from "../assets/imgs/home/soso.svg";
import Sad from "../assets/imgs/home/sad.svg";
import AuthInput from "@/components/auth/input";
import AuthButton from "@/components/auth/button";
import { isSameDay, parseISO } from "date-fns";
import Warning from "../assets/imgs/mypage/warning.svg";
import { useState, useEffect } from "react";
import {
  postDiary,
  postEmotion,
  viewDiary,
  viewEmotionEmoji,
} from "@/apis/diary";

export default function Home() {
  const [diaryTitle, setDiaryTitle] = useState<string | null>(null);
  const [diaryContent, setDiaryContent] = useState<string | null>(null);
  const [todayEmotion, setTodayEmotion] = useState<string | null>(null);
  const [hasTodayDiary, setHasTodayDiary] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();

        const emotionRes = await viewEmotionEmoji();
        const emotion = emotionRes.data.emotionList.find((e) =>
          isSameDay(parseISO(e.createdAt), today)
        );
        if (emotion) setTodayEmotion(emotion.emotion);

        const diaryRes = await viewDiary();
        const diary = diaryRes.data.diaries.find((d) =>
          isSameDay(parseISO(d.createdAt), today)
        );
        if (diary) setHasTodayDiary(true);
      } catch (error) {
        console.error("데이터 조회 실패:", error);
      }
    };

    fetchData();
  }, []);

  const handlePostDiary = async () => {
    if (diaryTitle != null && diaryContent != null) {
      postDiary({
        title: diaryTitle,
        note: diaryContent,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEmotion = (emoji: string) => {
    postEmotion({
      emotion: emoji,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <LogoLine>
        <Image src={Logo} alt="HHH" style={{ width: 75 }} />
      </LogoLine>
      <DailyDiaryWrapper>
        <TitleBar>
          <Title>
            <Pol>오늘</Pol>
            <Pol></Pol>
            <Pol color={"Mint"}>내 마음</Pol>
            <Pol>은 어떤가요?</Pol>
          </Title>
        </TitleBar>
        <EmotionFrame>
          {todayEmotion ? (
            <>
              <AfterEmoji>오늘 당신의 기분은</AfterEmoji>{" "}
              <Image
                src={
                  todayEmotion === "HAPPY"
                    ? Happy
                    : todayEmotion === "SOSO"
                    ? Soso
                    : Sad
                }
                alt="Image"
                style={{ width: 47 }}
              />
            </>
          ) : (
            <>
              <Image
                src={Happy}
                alt="happy"
                style={{ width: 47 }}
                onClick={() => handleEmotion("HAPPY")}
              />
              <Image
                src={Soso}
                alt="soso"
                style={{ width: 47 }}
                onClick={() => handleEmotion("SOSO")}
              />
              <Image
                src={Sad}
                alt="sad"
                style={{ width: 47 }}
                onClick={() => handleEmotion("SAD")}
              />
            </>
          )}
        </EmotionFrame>
        {hasTodayDiary ? (
          <DiaryInputArea>
            <Image src={Warning} alt="경고"></Image>
            <p>오늘의 일기는 이미 작성되었어요</p>
          </DiaryInputArea>
        ) : (
          <DiaryInputArea>
            <DiaryTitleWrapper>
              <DiaryTitle>제목</DiaryTitle>
              <AuthInput
                placeholder="일기 제목을 입력하세요."
                value={diaryTitle ?? ""}
                onChange={(e) => setDiaryTitle(e.target.value)}
              />
            </DiaryTitleWrapper>
            <DiaryContentWrapper>
              <DiaryTitle>감정 기록</DiaryTitle>
              <ContentInput
                value={diaryContent ?? ""}
                onChange={(e) => setDiaryContent(e.target.value)}
              />
            </DiaryContentWrapper>
            <AuthButton text="저장" onClick={handlePostDiary} />
          </DiaryInputArea>
        )}
      </DailyDiaryWrapper>
      <NavigationBar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 0px 20px 104px 20px;
`;

const LogoLine = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 18px;
`;

const DailyDiaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 13px;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 8px;
`;

const Title = styled.div`
  display: flex;
`;

const Pol = styled.p<{
  color?: string;
}>`
  font-size: 22px;
  min-width: 4.8px;
  letter-spacing: -0.32px;
  font-weight: bold;
  color: ${({ color }) => (color == "Mint" ? "#18e7c1" : "#fff")};
`;

const EmotionFrame = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  background-color: #414142;
  border-radius: 15px;
  height: 90px;
  justify-content: center;
  align-items: center;
  gap: 44px;
`;

const DiaryTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  margin-top: 25px;
  align-items: center;
`;

const DiaryTitle = styled.div`
  width: 100%;
  color: #fff;
  font-size: 15px;
  letter-spacing: -0.32px;
  font-weight: 500;
  line-height: 21px;
`;

const DiaryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  flex: 1;
`;

const DiaryInputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
`;

const AfterEmoji = styled.p`
  font-size: 16px;
  margin-right: -20px;
  color: #fff;
  width: auto;
`;
