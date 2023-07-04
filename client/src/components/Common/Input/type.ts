import { ChangeEvent, InputHTMLAttributes } from 'react';

export type InputValue = string | number | ReadonlyArray<string>;

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

export type Placeholder = string;

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'isvalid'> {
  value?: InputValue;
  onChange?: (e: InputChangeEvent) => void;
  placeholder?: Placeholder;
  isvalid?: boolean | string;
  width?: number | string;
}
