export interface Props {
  text: string;
  setToastState: React.Dispatch<React.SetStateAction<boolean>>;
  setToastAnimation: React.Dispatch<React.SetStateAction<string>>;
  toastAnimation: string;
}
