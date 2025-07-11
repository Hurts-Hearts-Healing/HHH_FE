"use client";

import styled from "styled-components";
import Image from "next/image";
import LogoRHL from "../../assets/imgs/logorhl.svg";
import Person from "../../assets/imgs/person.svg";
import Diary from "../../assets/imgs/mypage/diary.svg";
import Leave from "../../assets/imgs/mypage/leave.svg";
import Arrow from "../../assets/imgs/mypage/arrow.svg";
import NavigationBar from "@/components/common/navigationBar";
import { getUserInfo } from "@/apis/auth";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import Link from "next/link";
import { GetUserInfoResponse } from "@/apis/auth/type";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<GetUserInfoResponse | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        setUserInfo(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, [])

  const getDday = (breakupDate?: string) => {
    if (!breakupDate) return 0;

    const today = new Date();
    const breakup = new Date(breakupDate);
    const diffTime = today.getTime() - breakup.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  return (
    <Wrapper>
      <Image
        src={LogoRHL}
        alt="HHH"
        style={{ width: "75px", marginTop: "30px" }}
      />
      <ContentWrapper>
        <TitleWrapper>
          <span>이별한지</span>
          <span className="color">{getDday(userInfo?.breakupDate)}일차</span>
        </TitleWrapper>
        <InfoWrapper>
          <Image src={Person} alt="" />
          <TextWrapper>
            <UserName>{userInfo?.name}</UserName>
            <Birthday>{userInfo?.birthday.replaceAll("-", ".")}</Birthday>
          </TextWrapper>
        </InfoWrapper>
        <Line />
        <ListWrapper>
          <Link href={'/mypage/diary'}>
            <OptionWrapper>
              <HeadWrapper>
                <Image src={Diary} alt="" style={{ width: 20 }} />
                <p>일기 모아보기</p>
              </HeadWrapper>
              <EndWrapper>
                <p>내 감정 기록을 확인해보세요</p>
                <Image src={Arrow} alt=">" />
              </EndWrapper>
            </OptionWrapper>
          </Link>
          <OptionWrapper onClick={handleButtonClick}>
            <HeadWrapper>
              <Image src={Leave} alt="" style={{ width: 20 }} />
              <p className="point">회원 탈퇴</p>
            </HeadWrapper>
            <EndWrapper>
              <p>계정을 삭제합니다</p>
              <Image src={Arrow} alt=">" />
            </EndWrapper>
          </OptionWrapper>
        </ListWrapper>
      </ContentWrapper>
      <NavigationBar />
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  height: 100vh;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 17px;
  gap: 5px;
  > span {
    font-size: 22px;
    font-weight: 700;
  }
  .color {
    color: #18e7c1;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 83px;
  background-color: #414142;
  border-radius: 8px;
  align-items: center;
  padding: 25px;
  gap: 15px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const UserName = styled.p`
  font-weight: 600;
  font-size: 15px;
`;

const Birthday = styled.p`
  font-size: 13px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #414142;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  > p {
    font-size: 15px;
  }
  .point {
    color: #ff5151;
  }
`;

const EndWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  > p {
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
  }
`;
