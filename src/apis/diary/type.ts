export type ViewDiaryResponse = {
    diaries: ViewDiaryResponseArray[];
}

export type ViewDiaryResponseArray = {
    title: string;
    note: string;
    diaryId: string;
    createdAt: string; // YYYY-MM-DD
}