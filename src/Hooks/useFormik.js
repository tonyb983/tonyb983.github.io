import { useState } from 'react';
import { observable } from 'mobx';

export function useFormik({ initialValues }) {
  // useState to keep the same observable around without recreating it on each render
  const [formik] = useState(() =>
    observable({
      values: initialValues || {},
      touched: {},
    }),
  );

  // just mutate state, this function itself can be considered an action+reducer
  const handleChange = (fieldName) => (event) => {
    formik.values[fieldName] = event.target.value;
  };

  const handleBlur = (fieldName) => (event) => {
    formik.touched[fieldName] = true;
  };

  // props will be spread over the form inputs minimizing code necessary to setup such input
  const getFieldProps = (fieldName) => ({
    value: formik.values[fieldName],
    onChange: handleChange(fieldName),
    onBlur: handleBlur(fieldName),
  });

  return { handleChange, handleBlur, getFieldProps, ...formik };
}
