"use client";

import styled from "styled-components";
import NavigationBar from "@/components/common/navigationBar";
import Image from "next/image";
import LogoLHL from "../../assets/imgs/logolhl.svg";
import Happy from "../../assets/imgs/home/happy.svg";
import Soso from "../../assets/imgs/home/soso.svg";
import Sad from "../../assets/imgs/home/sad.svg";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

type GraphType = "DAY" | "WEEK" | "MONTH";

type GraphDatum = {
  period: string;
  happiness: number;
  status: string;
};

const dummyDayData: GraphDatum[] = [
  { period: "2025-05-21", happiness: 0.0, status: "매우 슬픔" },
  { period: "2025-05-22", happiness: 5.0, status: "보통" },
  { period: "2025-05-23", happiness: 7.0, status: "행복" },
  { period: "2025-05-24", happiness: 2.0, status: "슬픔" },
  { period: "2025-05-25", happiness: 8.0, status: "매우 행복" },
  { period: "2025-05-26", happiness: 4.0, status: "보통" },
];

const dummyWeekData: GraphDatum[] = [
  { period: "2025-05-18 ~ 2025-05-24", happiness: 2.5, status: "슬픔" },
  { period: "2025-05-25 ~ 2025-05-31", happiness: 5.0, status: "보통" },
  { period: "2025-06-01 ~ 2025-06-07", happiness: 6.5, status: "행복" },
  { period: "2025-06-08 ~ 2025-06-14", happiness: 8.2, status: "매우 행복" },
  { period: "2025-06-15 ~ 2025-06-21", happiness: 1.8, status: "매우 슬픔" },
  { period: "2025-06-22 ~ 2025-06-28", happiness: 4.4, status: "보통" },
  { period: "2025-06-29 ~ 2025-07-05", happiness: 7.7, status: "행복" },
];

const dummyMonthData: GraphDatum[] = [
  { period: "2025-01", happiness: 3.3, status: "슬픔" },
  { period: "2025-02", happiness: 4.1, status: "보통" },
  { period: "2025-03", happiness: 6.7, status: "행복" },
  { period: "2025-04", happiness: 7.9, status: "행복" },
  { period: "2025-05", happiness: 8.6, status: "매우 행복" },
  { period: "2025-06", happiness: 9.1, status: "매우 행복" },
  { period: "2025-07", happiness: 5.0, status: "보통" },
];

function filterRecentDayData(data: GraphDatum[]): GraphDatum[] {
  return data.sort((a, b) => (a.period > b.period ? 1 : -1)).slice(-7);
}

function filterRecentWeekData(data: GraphDatum[]): GraphDatum[] {
  return data
    .sort((a, b) => {
      const aStart = a.period.split(" ~ ")[0];
      const bStart = b.period.split(" ~ ")[0];
      return aStart > bStart ? 1 : -1;
    })
    .slice(-6);
}

function filterRecentMonthData(data: GraphDatum[]): GraphDatum[] {
  return data.sort((a, b) => (a.period > b.period ? 1 : -1)).slice(-6);
}

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (cx === undefined || cy === undefined) return null;

  const status = payload.status;
  let outerColor = "#5f97ff";
  let innerColor = "#5f97ff";

  if (status === "매우 슬픔" || status === "슬픔") {
    outerColor = "rgba(255, 89, 89, 0.5)";
    innerColor = "rgba(255, 89, 89, 1)";
  } else if (status === "보통" || status === "행복") {
    outerColor = "rgba(95, 151, 255, 0.5)";
    innerColor = "rgba(95, 151, 255, 1)";
  } else if (status === "매우 행복") {
    outerColor = "rgba(24, 231, 193, 0.5)";
    innerColor = "rgba(24, 231, 193, 1)";
  }

  return (
    <>
      <circle cx={cx} cy={cy} r={7} fill={outerColor} />
      <circle cx={cx} cy={cy} r={5} fill={innerColor} />
    </>
  );
};

export default function Graph() {
  const [graphType, setGraphType] = useState<GraphType>("DAY");
  const [graphData, setGraphData] = useState<GraphDatum[]>([]);

  const handleClick = (type: GraphType) => {
    setGraphType(type);
  };

  const fetchGraphData = (type: GraphType) => {
    if (type === "DAY") {
      setGraphData(filterRecentDayData(dummyDayData));
    } else if (type === "WEEK") {
      setGraphData(filterRecentWeekData(dummyWeekData));
    } else {
      setGraphData(filterRecentMonthData(dummyMonthData));
    }
  };

  useEffect(() => {
    fetchGraphData(graphType);
  }, [graphType]);

  const formatXAxisTick = (str: string, graphType: GraphType) => {
    if (graphType === "DAY") {
      return str.slice(5, 7) + "/" + str.slice(8, 10);
    }
    if (graphType === "WEEK") {
      const parts = str.split(" ~ ");
      if (parts.length === 2) {
        const [start, end] = parts;
        return (
          start.slice(5, 7) +
          "/" +
          start.slice(8, 10) +
          "~" +
          end.slice(5, 7) +
          "/" +
          end.slice(8, 10)
        );
      }
      return str;
    }
    if (graphType === "MONTH") {
      return str.slice(0, 4) + "/" + str.slice(5);
    }
    return str;
  };

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
          <Day
            $onDayView={graphType === "DAY"}
            onClick={() => handleClick("DAY")}
          >
            일
          </Day>
          <Week
            $onWeekView={graphType === "WEEK"}
            onClick={() => handleClick("WEEK")}
          >
            주
          </Week>
          <Month
            $onMonthView={graphType === "MONTH"}
            onClick={() => handleClick("MONTH")}
          >
            월
          </Month>
        </ButtonWrapper>
        <GraphContainer>
          {graphData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={250}
              style={{ marginLeft: "-20px" }}
            >
              <LineChart data={graphData}>
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#7f7f7f" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="period"
                  tickFormatter={(str) => formatXAxisTick(str, graphType)}
                  interval={0}
                  textAnchor="end"
                  tickLine={false}
                  tick={(props) => {
                    const { x, y, payload } = props;
                    return (
                      <text
                        x={x}
                        y={y}
                        dy={10}
                        fontSize={10}
                        textAnchor="end"
                        fill="#ccc"
                        transform={`rotate(-10, ${x}, ${y})`}
                      >
                        {formatXAxisTick(payload.value, graphType)}
                      </text>
                    );
                  }}
                >
                  <Label
                    value="기간"
                    position="insideBottom"
                    offset={0}
                    style={{
                      fontSize: "10px",
                      fill: "#fff",
                      fontWeight: "bold",
                    }}
                  />
                </XAxis>
                <YAxis
                  domain={[0, 10]}
                  tickCount={6}
                  tickLine={false}
                  tick={(props) => {
                    const { x, y, payload } = props;
                    return (
                      <text
                        x={x - 2}
                        y={y}
                        dy={2}
                        textAnchor="end"
                        fontSize={10}
                        fill="#fff"
                      >
                        {payload.value}
                      </text>
                    );
                  }}
                >
                  <Label
                    value="행복도"
                    angle={-90}
                    position="insideLeft"
                    offset={30}
                    style={{
                      fontSize: "10px",
                      fill: "#fff",
                      fontWeight: "bold",
                    }}
                  />
                </YAxis>
                <Tooltip
                  formatter={(value: number) => `${value}점`}
                  labelFormatter={(label: string) => `기간: ${label}`}
                />
                <defs>
                  <marker
                    id="arrowup"
                    markerWidth="6"
                    markerHeight="6"
                    refX="3"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M6,0 L0,3 L6,6 Z" fill="#fff" />
                  </marker>
                </defs>
                <line
                  x1={65}
                  y1={5}
                  x2={65}
                  y2={215}
                  stroke="#fff"
                  strokeWidth={1}
                  markerStart="url(#arrowup)"
                />
                <defs>
                  <marker
                    id="arrowright"
                    markerWidth="6"
                    markerHeight="6"
                    refX="3"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M6,0 L0,3 L6,6 Z" fill="#fff" />
                  </marker>
                </defs>
                <line
                  x1={350}
                  y1={215}
                  x2={65}
                  y2={215}
                  stroke="#fff"
                  strokeWidth={1}
                  markerStart="url(#arrowright)"
                />
                <Line
                  type="monotone"
                  dataKey="happiness"
                  stroke="url(#lineGradient)"
                  strokeWidth={2}
                  dot={<CustomDot />}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyMessage>데이터가 없습니다.</EmptyMessage>
          )}
        </GraphContainer>
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

const EmptyMessage = styled.div`
  color: #888;
  font-size: 14px;
  text-align: center;
  line-height: 200px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 0px 20px 104px 20px;
`;

const GraphContainer = styled.div`
  width: calc(100vw - 40px);
  height: 250px;
  background-color: #414142;
  border-radius: 8px;
`;

const LogoLine = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 18px;
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
  flex: 1;
  width: 100%;
  background-color: rgba(65, 65, 66, 0.3);
  margin-top: 20px;
  border-radius: 15px;
  padding: 15px 10px;
  gap: 6px;
  overflow: hidden;
`;

const AIARTop = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
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
  height: 100%;
  overflow-y: scroll;
`;
