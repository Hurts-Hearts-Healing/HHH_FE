export type ViewDiaryResponse = {
    diaries: ViewDiaryResponseArray[];
}

export type ViewDiaryResponseArray = {
    title: string;
    note: string;
    diaryId: string;
    createdAt: string; // YYYY-MM-DD
}

export type ViewEmotionEmojiResponse = {
    emotionList: ViewEmotionEmojiResponseArray[];
}

export type ViewEmotionEmojiResponseArray = {
    emotion: string;
    createdAt: string; // YYYY-MM-DD
}