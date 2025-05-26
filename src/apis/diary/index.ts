import { instance } from "../axios"
import { ViewDiaryResponse, ViewEmotionEmojiResponse } from "./type"

export const viewDiary = async () => {
    return await instance.get<ViewDiaryResponse>('/api/diary')
}

export const viewEmotionEmoji = async () => {
    return await instance.get<ViewEmotionEmojiResponse>('/api/emotion');
}