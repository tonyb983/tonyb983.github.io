import * as yup from 'yup';

yup.addMethod(yup.array, 'unique', function(message, mapper = (a) => a) {
  return this.test('unique', message, function(list) {
    return list.length === new Set(list.map(mapper)).size;
  });
});

export const newPostSchema = yup.object({
  title: yup
    .string()
    .required()
    .min(1),
  content: yup
    .string()
    .required()
    .min(1),
  tags: yup
    .array()
    .of(yup.string())
    .unique('Duplicate tag')
    .ensure(),
});
