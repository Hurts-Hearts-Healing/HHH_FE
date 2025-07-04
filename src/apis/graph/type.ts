export type graphDayType = {
  period: string; // YYYY-MM-DD
  happiness: Number;
  status: string;
};

export type graphDataDay = {
  graphData: graphDayType[];
};

export type graphWeekType = {
  period: string; // YYYY-MM-DD ~ YYYY-MM-DD
  happiness: Number;
  status: string;
};

export type graphDataWeek = {
  graphData: graphWeekType[];
};

export type graphMonthType = {
  period: string; // YYYY-MM
  happiness: Number;
  status: string;
};

export type graphDataMonth = {
  graphData: graphMonthType[];
};

export type AIAnalysisType = {
  analysis: AIAnalysisContent[];
};

export type AIAnalysisContent = {
  userId: string;
  diaryId: string;
  emotion: string;
  createdAt: string; // YYYY-MM-DD
};
