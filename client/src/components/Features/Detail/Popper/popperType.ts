export type PopperData = {
  groups?: PopperGroup[];
  interface?: PageInfo;
};
export type PopperDetailData = {
  data: {
    groupId: number;
    title: string;
    meetingDate: string;
    location: string;
    maxCapacity: number;
    content: string;
  };
};

export interface PopperGroup {
  groupId?: number;
  title?: string;
  location?: string;
  meetingDate?: string;
  maxCapacity?: number;
  current?: number;
  users?: Users[];
}

interface Users {
  userId: number;
  profileImage: string;
}

interface PageInfo {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}
