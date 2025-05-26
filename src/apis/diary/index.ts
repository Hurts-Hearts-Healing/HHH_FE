import { instance } from "../axios"
import { ViewDiaryResponse } from "./type"

export const viewDiary = async () => {
    return await instance.get<ViewDiaryResponse>('/api/diary')
}