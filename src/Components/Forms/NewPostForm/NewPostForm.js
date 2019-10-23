import React, { Fragment, useState } from 'react';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import { Redirect } from 'react-router-dom';
import { uniq } from 'lodash';
import { Input, Label, TextArea, Container, GreenButton, Button } from 'pcln-design-system';
import { newPostSchema } from './NewPostSchema';
import { useStore } from '../../Providers/StoreProvider';
import Debug from '../../../Utils/DebugComponent';

const NewPostForm = () => {
  const [redirect, setRedirect] = useState(false);
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
      {redirect && <Redirect to="/posts" />}
      <Formik
        initialValues={{
          title: '',
          content: '',
          tags: ['tag1', 'tag2'],
          tagInput: '',
        }}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
          setRedirect(true);
        }}
        validationSchema={newPostSchema}
      >
        {({ isSubmitting, handleReset, values, dirty, setFieldValue, validateField }) => (
          <Container>
            {isSubmitting && <div />}
            <Form>
              <Label pt={2} htmlFor="title">
                Post Title
              </Label>
              <Field
                placeholder="Enter Title..."
                name="title"
                render={(field, form) => {
                  return (
                    <div>
                      {/* <Debug field={field} form={form} /> */}
                      <Input
                        id="title"
                        value={field.value}
                        onChange={(evt) => {
                          setFieldValue('title', evt.target.value);
                          validateField('title');
                        }}
                      />
                    </div>
                  );
                }}
              />
              <ErrorMessage name="title" />

              <Label pt={2} htmlFor="content">
                Post Content
              </Label>
              <Field
                name="content"
                placeholder="Post Content..."
                render={(field, form) => {
                  return (
                    <div>
                      {/* <Debug field={field} form={form} /> */}
                      <TextArea
                        id="content"
                        value={field.value}
                        onChange={(evt) => {
                          setFieldValue('content', evt.target.value);
                          validateField('content');
                        }}
                      />
                    </div>
                  );
                }}
              />
              <ErrorMessage name="content" />

              <Label htmlFor="tags" hidden>
                Tags
              </Label>
              <FieldArray name="tags">
                {({ push, remove, pop }) => {
                  const handleKeyDown = (evt) => {
                    if (!evt || !evt.keyCode) return;

                    if (evt.keyCode === 188 && values.tagInput !== '') {
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
                      <ul>
                        {values.tags.map((item, i) => (
                          <li key={`${item}${i}`} onClick={handleRemove(i)}>
                            {item}
                            <span>(x)</span>
                          </li>
                        ))}
                        <Field type="text" name="tagInput" onKeyDown={handleKeyDown} />
                      </ul>
                    </label>
                  );
                }}
              </FieldArray>
              <ErrorMessage name="tags" />

              <GreenButton type="submit" disabled={isSubmitting}>
                Submit
              </GreenButton>
              <Button color="lightYellow" disabled={!dirty} onClick={handleReset} type="button">
                Reset
              </Button>
            </Form>
          </Container>
        )}
      </Formik>
    </Fragment>
  );
};

export default NewPostForm;
