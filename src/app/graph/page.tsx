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
  getGraphDataDay,
  getGraphDataMonth,
  getGraphDataWeek,
  analysisAI,
  getAIAnalysis,
} from "@/apis/graph";
import { viewDiary, viewEmotionEmoji } from "@/apis/diary";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
} from "recharts";

type GraphType = "DAY" | "WEEK" | "MONTH";

type GraphDatum = {
  period: string;
  happiness: Number;
  status: string;
};

type Diaries = {
  title: string;
  note: string;
  diaryId: string;
  createdAt: string; // YYYY-MM-DD
};

type Emojies = {
  emotion: string;
  createdAt: string; // YYYY-MM-DD
};

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

export default function Graph() {
  const [graphType, setGraphType] = useState<GraphType>("DAY");
  const [graphData, setGraphData] = useState<GraphDatum[]>([]);
  const [graphDay, setGraphDay] = useState<GraphDatum[]>([]);
  const [graphWeek, setGraphWeek] = useState<GraphDatum[]>([]);
  const [graphMonth, setGraphMonth] = useState<GraphDatum[]>([]);
  const [diaries, setDiaries] = useState<Diaries[]>([]);
  const [emojies, setEmojies] = useState<Emojies[]>([]);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>("");
  const [showAIResult, setShowAIResult] = useState<boolean>(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const handleDotClick = async (data: GraphDatum) => {
    if (graphType !== "DAY") return;

    const diary = diaries.find((d) => d.createdAt === data.period);
    const emotion = emojies.find((e) => e.createdAt === data.period)?.emotion;

    if (!diary) return;

    try {
      await analysisAI(diary.diaryId);
      const result = await getAIAnalysis();
      setAiAnalysisResult(result.data.analysis);
      setSelectedEmotion(emotion ?? null);
      setShowAIResult(true);
    } catch (error) {
      console.error("AI 분석 에러:", error);
    }
  };

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

  const fetchData = async () => {
    try {
      const [diaryRes, emotionRes, GraphDayRes, GraphWeekRes, GraphMonthRes] =
        await Promise.all([
          viewDiary(),
          viewEmotionEmoji(),
          getGraphDataDay(),
          getGraphDataWeek(),
          getGraphDataMonth(),
        ]);
      setDiaries(diaryRes.data.diaries);
      setEmojies(emotionRes.data.emotionList);
      setGraphDay(GraphDayRes.data.graphData);
      setGraphWeek(GraphWeekRes.data.graphData);
      setGraphMonth(GraphMonthRes.data.graphData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (type: GraphType) => {
    setGraphType(type);
  };

  const fetchGraphData = (type: GraphType) => {
    if (type === "DAY") {
      setGraphData(filterRecentDayData(graphDay));
    } else if (type === "WEEK") {
      setGraphData(filterRecentWeekData(graphWeek));
    } else {
      setGraphData(filterRecentMonthData(graphMonth));
    }
  };

  useEffect(() => {
    fetchGraphData(graphType);
  }, [graphType]);

  useEffect(() => {
    fetchData();
  }, []);

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
      {/* <LogoLine> */}
        <Image src={LogoLHL} alt="HHH" style={{ width: 75, marginTop: 30 }} />
      {/* </LogoLine> */}
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
              <LineChart
                data={graphData}
                onClick={(e) => {
                  if (e && e.activeLabel) {
                    const clickedDatum = graphData.find(
                      (d) => d.period === e.activeLabel
                    );
                    if (clickedDatum) handleDotClick(clickedDatum);
                  }
                }}
              >
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
      {showAIResult && (
        <AIAnalysisResultContainer>
          <AIARTop>
            <TopCover>
              <PolS color={"Mint"}>AI 감정 변화</PolS>
              <PolS></PolS>
              <PolS>분석 결과</PolS>
            </TopCover>
            <WhiteBlock></WhiteBlock>
            {selectedEmotion === "HAPPY" && (
              <Image
                src={Happy}
                alt="happy"
                style={{ width: 21, height: 22 }}
              />
            )}
            {selectedEmotion === "SOSO" && (
              <Image src={Soso} alt="soso" style={{ width: 21, height: 22 }} />
            )}
            {selectedEmotion === "SAD" && (
              <Image src={Sad} alt="sad" style={{ width: 21, height: 22 }} />
            )}
          </AIARTop>
          <AIARContent>{aiAnalysisResult}</AIARContent>
        </AIAnalysisResultContainer>
      )}
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
  min-height: 100dvh;
  padding: 0px 20px 104px 20px;
`;

const GraphContainer = styled.div`
  width: calc(100vw - 40px);
  height: 250px;
  background-color: #414142;
  border-radius: 8px;
`;

// const LogoLine = styled.div`
//   display: flex;
//   width: 100%;
//   height: auto;
//   margin-top: 18px;
// `;

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
