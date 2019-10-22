import { types } from 'mobx-state-tree';
import { isString, isArray } from 'lodash';
import shortid from 'shortid';

export const Post = types
  .model({
    id: types.optional(types.identifier, () => shortid()),
    title: types.string,
    content: types.string,
    created: types.optional(types.Date, () => new Date()),
    tags: types.array(types.string),
  })
  .views((self) => ({}))
  .actions((self) => ({
    afterCreate() {
      if (self.tags.length > 0) {
        const fixed = [];
        self.tags.forEach(
          (tag) =>
            isString(tag) && fixed.indexOf(tag.toLowerCase()) < 0 && fixed.push(tag.toLowerCase()),
        );
        self.tags.replace(fixed);
      }
    },
  }))
  .actions((self) => ({
    updateTitle(newTitle) {
      if (!newTitle || !isString(newTitle)) {
        return;
      }

      self.title = newTitle;
    },
    updateContent(newContent) {
      if (!newContent || !isString(newContent)) {
        return;
      }

      self.content = newContent;
    },
    appendContent(addContent) {
      if (!addContent || !isString(addContent)) {
        return;
      }

      self.content = self.content.concat(addContent);
    },
    addTag(tag) {
      if (!tag) return;

      if (isString(tag) && self.tags.indexOf(tag) < 0) {
        self.tags.push(tag.toLowerCase());
      } else if (isArray(tag)) {
        tag.forEach(
          (t) => isString(t) && self.tags.indexOf(t) < 0 && self.tags.push(t.toLowerCase()),
        );
      } else {
        console.log(`Post@AddTag: Don't know how to handle data '${JSON.stringify(tag)}'`);
      }
    },
    removeTag(tag) {
      if (isString(tag)) {
        const index = self.tags.indexOf(tag.toLowerCase());
        if (index < 0) {
          return;
        }
        self.tags.splice(index, 1);
      }
    },
    hasTag(tag) {
      if (!tag || !isString(tag)) return false;

      return self.tags.indexOf(tag.toLowerCase()) > -1;
    },
  }));
