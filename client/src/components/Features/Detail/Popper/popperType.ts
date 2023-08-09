import { data } from '../../../../api/pot/potType';
import { Group } from '../../../../pages/Detail/Detailcontent/detailType';

export interface PopperData {
  groups?: PopperGroup[];
  interface?: PageInfo;
}

export interface PopperDetailData {
  data: {
    groupId: number;
    title: string;
    meetingDate: string;
    location: string;
    maxCapacity: number;
    content: string;
  };
}

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

export interface PopperBoxProps {
  groups: Group[];
  reviewId: string;
  movie: string;
}

export interface PopperDetailProps {
  reviewId: string;
  currentId: number;
  setCurrentID: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRender: React.Dispatch<React.SetStateAction<string>> | undefined;
  currentPage: string;
}

export interface ModalData {
  groupId: number;
  modalData: data;
}

export interface PoppeEditProps {
  currentId: number;
  setCurrentRender: React.Dispatch<React.SetStateAction<string>> | undefined;
  currentPage: string;
}

export interface PopperListProps {
  groups: Group[];
  setCurrentID: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRender: React.Dispatch<React.SetStateAction<string>>;
}

export interface PopperWriteProps {
  setCurrentRender: React.Dispatch<React.SetStateAction<string>>;
  reviewId: string;
  movie: string;
}
