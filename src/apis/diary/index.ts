import { instance } from "../axios";
import {
  ViewDiaryResponse,
  ViewEmotionEmojiResponse,
  DiaryType,
  Emotion,
} from "./type";

export const viewDiary = async () => {
  return await instance.get<ViewDiaryResponse>("/api/diary");
};

export const viewEmotionEmoji = async () => {
  return await instance.get<ViewEmotionEmojiResponse>("/api/emotion");
};

export const postDiary = async (data: DiaryType) => {
  return await instance.post("/api/diary", data);
};

export const postEmotion = async (data: Emotion) => {
  return await instance.post("/api/emotion", data);
};
