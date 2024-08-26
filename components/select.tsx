import { forwardRef, SelectHTMLAttributes, Ref } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default forwardRef(function Select(
  props: SelectProps, 
  ref: Ref<HTMLSelectElement>
) {
  return (
    <select
      {...props}
      ref={ref} // Make sure the ref is properly passed here
      className={`w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 ${props.className || ''}`}
    />
  );
});
