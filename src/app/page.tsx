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

export default function Home() {
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
          <Image src={Happy} alt="happy" style={{ width: 47 }} />
          <Image src={Soso} alt="soso" style={{ width: 47 }} />
          <Image src={Sad} alt="sad" style={{ width: 47 }} />
        </EmotionFrame>
        <DiaryTitleWrapper>
          <DiaryTitle>제목</DiaryTitle>
          <AuthInput placeholder="일기 제목을 입력하세요."/>
        </DiaryTitleWrapper>
        <DiaryContentWrapper>
          <DiaryTitle>감정 기록</DiaryTitle>
          <ContentInput />
        </DiaryContentWrapper>
        <AuthButton text="저장" />
      </DailyDiaryWrapper>
      <NavigationBar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px 20px 104px 20px;
`;

const LogoLine = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;

const DailyDiaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  border-radius: 30px;
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
`;

const DiaryTitle = styled.div`
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
`;
