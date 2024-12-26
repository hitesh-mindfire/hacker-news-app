export interface UserState {
  userDetails: UserDetails | null;
  loading: boolean;
  error: string | null;
}

export interface UserDetails {
  id: string;
  karma: number;
  created: number;
  about?: string;
}
