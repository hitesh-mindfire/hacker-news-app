export interface NewsListProps {
  newsType: "New" | "Past";
}

export interface NewsCardProps {
  newsItem: News;
}

export interface NewsState {
  newNewsIds: number[];
  pastNewsIds: number[];
  loading: boolean;
  error: string | null;
}

export interface News {
  id: number;
  title: string;
  by: string;
  time: number;
  score?: number;
  descendants?: number;
  url?: string;
}
