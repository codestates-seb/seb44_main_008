export interface SingleItemType {
  reviewId?: string;
  src?: string;
  title?: string;
  date?: string;
  author?: string;
  isMain?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
