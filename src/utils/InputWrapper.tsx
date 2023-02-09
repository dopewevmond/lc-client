import React from "react";
import { useField } from "formik";

type InputWrapperType = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputWrapper: React.FC<InputWrapperType> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={field.name}
      >
        {label}
      </label>
      <input {...field} {...props} />
      <div className="mt-1 mb-2 h-4 font-medium text-xs text-red-500">
        {meta.touched && meta.error ? meta.error : null}
      </div>
    </div>
  );
};
