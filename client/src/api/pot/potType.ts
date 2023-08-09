export interface data {
  title: string | undefined;
  meetingDate: string | undefined;
  location: string | undefined;
  maxCapacity: number | undefined;
  content: string | undefined;
}

export interface potData {
  reviewId: string;
  data: {
    title: string | undefined;
    meetingDate: string | undefined;
    location: string | undefined;
    maxCapacity: number | undefined;
    content: string | undefined;
    movieTitle: string;
  };
}
