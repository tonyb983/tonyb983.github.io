import React, { Fragment } from 'react';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import { uniq } from 'lodash';
import { newPostSchema } from './NewPostSchema';
import { useStore } from '../../Providers/StoreProvider';

import style from './NewPostForm.module.css';

const NewPostForm = () => {
  const { blog } = useStore();
  const handleSubmit = (values, actions) => {
    const { title, content, tags } = values;
    const test = '';
    const tagArray = uniq(test.split(','));
    actions.setSubmitting(true);
    alert(`Submitting with values: ${JSON.stringify(values, null, 2)}`);
    blog.addPost({ title, content, tags });
    actions.setSubmitting(false);
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          title: '',
          content: '',
          tags: ['tag1', 'tag2'],
          tagInput: '',
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          alert(JSON.stringify(values, null, 2));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 2000);
        }}
        validationSchema={newPostSchema}
      >
        {({ isSubmitting, handleReset, values, dirty, setFieldValue }) => (
          <div>
            {isSubmitting && <div className={style.Overlay} />}
            <Form className={style.Form}>
              <Field
                type="text"
                placeholder="Enter Title..."
                name="title"
                className={style.Title}
              />

              <ErrorMessage name="title" className={style.ErrorText} />

              <Field
                type="textarea"
                name="content"
                placeholder="Post Content..."
                className={style.Content}
              />

              <ErrorMessage name="content" className={style.ErrorText} />

              <FieldArray name="tags">
                {({ push, remove, pop }) => {
                  const handleKeyDown = (evt) => {
                    if (!evt || !evt.keyCode) return;

                    if ((evt.keyCode === 13 || evt.keyCode === 188) && values.tagInput !== '') {
                      push(values.tagInput);
                      setFieldValue('tagInput', '');
                      return;
                    }

                    if (evt.keyCode === 8 && values.tagInput === '' && values.tags.length > 0) {
                      pop();
                    }
                  };

                  const handleRemove = (index) => (evt) => {
                    remove(index);
                  };

                  return (
                    <label>
                      <ul className={style.TagContainer}>
                        {values.tags.map((item, i) => (
                          <li key={`${item}${i}`} className={style.Tag} onClick={handleRemove(i)}>
                            {item}
                            <span>(x)</span>
                          </li>
                        ))}
                        <Field
                          className={style.TagInput}
                          type="text"
                          name="tagInput"
                          onKeyDown={handleKeyDown}
                        />
                      </ul>
                    </label>
                  );
                }}
              </FieldArray>

              <ErrorMessage name="tags" className={style.ErrorText} />

              <button
                type="submit"
                disabled={!dirty || isSubmitting}
                className={`${style.Button} ${style.SubmitButton}`}
              >
                Submit
              </button>
              <button
                disabled={!dirty}
                onClick={handleReset}
                type="button"
                className={style.Button}
              >
                Reset
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </Fragment>
  );
};

export default NewPostForm;
