import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { useFormik } from '../../Hooks/useFormik';
import Debug from '../../Utils/DebugComponent';

const NewPostPage = (props) => {
  // use the formik hook with optional initial values
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
  });
  const { getFieldProps } = formik;

  // notice the useObserver hook that takes care of re-rendering
  return useObserver(() => (
    <form>
      <label>
        Title:
        <input type="text" {...getFieldProps('name')} />
      </label>
      <p />
      <label>
        Content:
        <textarea {...getFieldProps('content')} />
      </label>
      <Debug inherited props={props} formik={formik} />
      <button type="submit">Submit</button>
    </form>
  ));
};

export default NewPostPage;
