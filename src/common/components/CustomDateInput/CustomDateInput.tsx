type CustomDateInputPropsType = { value: string };

export const CustomDateInput = ({ value }: CustomDateInputPropsType) => {
  return <input placeholder="DD/MM/YYYY" type="text" inputMode="text" value={value} />;
};
