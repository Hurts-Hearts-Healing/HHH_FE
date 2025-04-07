"use client";

import styled from "styled-components";
import NavigationBar from "@/components/common/navigationBar";
import Image from "next/image";
import LogoLHL from "../../assets/imgs/logolhl.svg";
import Happy from "../../assets/imgs/home/happy.png";
import Soso from "../../assets/imgs/home/soso.png";
import Sad from "../../assets/imgs/home/sad.png";

export default function Graph() {
  return (
    <Wrapper>
      <LogoLine>
        <Image src={LogoLHL} alt="HHH" style={{ width: 75 }} />
      </LogoLine>
      <TitleLine>
        <Title>
          <Pol color={"Mint"}>감정 변화</Pol>
          <Pol></Pol>
          <Pol>그래프</Pol>
        </Title>
      </TitleLine>
      <GraphWrapper>
        <ButtonWrapper>
          <Day $onDayView={true}>일</Day>
          <Week $onWeekView={false}>주</Week>
          <Month $onMonthView={false}>월</Month>
        </ButtonWrapper>
        <GraphContainer></GraphContainer>
      </GraphWrapper>
      <AIAnalysisResultContainer>
        <AIARTop>
          <TopCover>
            <PolS color={"Mint"}>AI 감정 변화</PolS>
            <PolS></PolS>
            <PolS>분석 결과</PolS>
          </TopCover>
          <WhiteBlock></WhiteBlock>
          <Image src={Sad} alt="sad" style={{ width: 21, height: 22 }} />
        </AIARTop>
        <AIARContent>
          9일동안 만난 사람이 있는데 7일은 만났지만 2일은 잠수탐 왜냐 남자가
          쓰레기이기 때문이다! 그래서 나는 힘들지도 않다. 왜냐하면 너무
          쓰레기인데 너무너무 쓰레기여서 우엑 으으으으... 그래서 그냥 경험도
          아니고 이상한 사람 구경했다 이정도로 남겨두기로 함 ㅋ 에바지 하
          이제부터 연애 절대 안함 연애하면 내가 쥐구멍에 들어가서 쥐랑 같이
          살거임 그리고 연애나 썸을 타면 내가 그냥 우리반 애들한테 설빙을 산다
          진짜 그 정도로 연애 안 함 썸도 안 탐 ㄹㅇ로 진지하게 나는 정말 연애
          안할거고 결혼만 할거다. 아니 근데 결혼을 할려면 연애를 해야하는데
          연애를 안한다 했으니 결혼도 안한다... ㅇㅋㅇㅋ 이거다 나는 솔로가 맞다
          나의 연애 중 지금까지 했던 연애 전부 다 솔직히 재미가 없었다 정말
          파격적이다. 앞으로 더 연애 해봤자 감정 낭비 그리고 나는 연애를 안하고
          2반 애들만 웃겨주겠다. 2반 애들만 웃으면 정말 좋을 듯 서무성쌤 포함
          2반이 행복하면 나도 행복하다. 어쨌든 나는 연애를 하면 버러지 그리고
          멍청이 감정쓰레기통 2반의 노예 그리고 그냥 입 다물고 살아야 하는
          사람으로 남겠다 단 연애하는 조건 , 자만추 자연스럽게 만나면 연애할거임
          근데 소개는 앞으로 죽어도 안받음 얼마전 대전고 남자 소개 받을래? 라고
          중학교 친구가 연락이 왔는데 안받을 거다. 하하하하 2반 화이팅
        </AIARContent>
      </AIAnalysisResultContainer>
      <NavigationBar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px 20px;
  height: 100vh;
`;

const GraphContainer = styled.div`
  width: calc(100vw - 40px);
  height: 200px;
  background-color: #414142;
  padding: 10px;
  border-radius: 8px;
`;

const LogoLine = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;

const TitleLine = styled.div`
  display: flex;
  margin-top: 13px;
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

const PolS = styled.p<{
  color?: string;
}>`
  font-size: 17px;
  min-width: 4.8px;
  letter-spacing: -0.32px;
  font-weight: 500;
  color: ${({ color }) => (color == "Mint" ? "#18e7c1" : "#fff")};
`;

const Day = styled.div<{
  $onDayView: boolean;
}>`
  display: flex;
  border-radius: 8px;
  width: 32.4px;
  height: 37px;
  justify-content: center;
  align-items: center;
  font-size: 13.5px;
  font-weight: bold;
  border: none;
  background-color: ${(props) => (props.$onDayView ? "#18e7c1" : "#414142")};
  color: ${(props) => (props.$onDayView ? "#fff" : "#888888")};
`;

const Week = styled.div<{
  $onWeekView: boolean;
}>`
  display: flex;
  border-radius: 8px;
  width: 32.4px;
  height: 37px;
  justify-content: center;
  align-items: center;
  font-size: 13.5px;
  font-weight: bold;
  border: none;
  background-color: ${(props) => (props.$onWeekView ? "#18e7c1" : "#414142")};
  color: ${(props) => (props.$onWeekView ? "#fff" : "#888888")};
`;

const Month = styled.div<{
  $onMonthView: boolean;
}>`
  display: flex;
  border-radius: 8px;
  width: 32.4px;
  height: 37px;
  justify-content: center;
  align-items: center;
  font-size: 13.5px;
  font-weight: bold;
  border: none;
  background-color: ${(props) => (props.$onMonthView ? "#18e7c1" : "#414142")};
  color: ${(props) => (props.$onMonthView ? "#fff" : "#888888")};
`;

const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
  gap: 24px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const AIAnalysisResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 40px);
  height: 287px;
  background-color: rgba(65, 65, 66, 0.3);
  margin-top: 20px;
  border-radius: 15px;
  padding: 12px 10px;
  gap: 3px;
`;

const AIARTop = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  height: 26px;
`;

const TopCover = styled.div`
  display: flex;
`;

const WhiteBlock = styled.div`
  background-color: #fff;
  width: calc(100vw - 259px);
  height: 1px;
  border: none;
`;

const AIARContent = styled.div`
  color: #fff;
  font-size: 13px;
  letter-spacing: -0.32px;
  line-height: 21px;
  height: 232px;
  overflow-y: scroll;
`;
