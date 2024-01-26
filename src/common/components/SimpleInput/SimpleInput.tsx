import { ChangeEvent, KeyboardEvent } from "react";

type Props = {
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onEnterKeyDown: () => void
  onBlur?: () => void
  autoFocus?: boolean
}

export const SimpleInput = ({ value, onChange, onEnterKeyDown, autoFocus = false, onBlur }: Props) => {

  const onKeyDownCallback = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnterKeyDown();
    }
  };

  return <input type = "text"
                value = {value}
                autoFocus = {autoFocus}
                onChange = {onChange}
                onBlur = {onBlur}
                onKeyDown = {onKeyDownCallback}
                className = "flex-grow block  px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />;

};