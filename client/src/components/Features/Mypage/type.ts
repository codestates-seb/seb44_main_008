export interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}
