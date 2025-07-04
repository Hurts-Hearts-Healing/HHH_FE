import { instance } from "../axios";
import {
  graphDataDay,
  graphDataMonth,
  graphDataWeek,
  AIAnalysisType,
} from "./type";

export const getGraphDataDay = async () => {
  return await instance.get<graphDataDay>("/api/emotion/graph?period=DAY");
};

export const getGraphDataWeek = async () => {
  return await instance.get<graphDataWeek>("/api/emotion/graph?period=WEEK");
};

export const getGraphDataMonth = async () => {
  return await instance.get<graphDataMonth>("/api/emotion/graph?period=MONTH");
};

export const analysisAI = async (id: string) => {
  return await instance.post(`/api/emotion/analysis/${id}`);
};

export const getAIAnalysis = async () => {
  return await instance.get<AIAnalysisType>("/api/emotion/analysis");
};
