

export interface ButtonType {
  id?: number;
  value?: string;
  type?: string;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | void;
}
