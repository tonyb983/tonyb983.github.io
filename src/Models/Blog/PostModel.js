import { types, getEnv, isStateTreeNode, typecheck } from 'mobx-state-tree';
import { values } from 'mobx';
import { uniq, flatten, isString, isArray, isFunction, isBoolean } from 'lodash';
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

export const PostStore = types
  .model({
    posts: types.map(Post),
    debugMode: false,
  })
  .views((self) => ({
    get postCount() {
      return self.posts.size;
    },
    get allTags() {
      // return uniq(flatten(values(self.posts).map(p => p.tags)));
      const result = [];
      values(self.posts).forEach((post) =>
        post.tags.forEach((tag) => result.indexOf(tag) < 0 && result.push(tag)),
      );
      return result;
    },
    /**
     * Searches for a Post with the given ID.
     * @param {String} id The ID to search for.
     */
    getPostByID(id) {
      return self.posts.get(id);
    },
    /**
     * Searches all posts for an exact tag match.
     * @param {String} tag The exact tag to search for.
     */
    searchPostsByTag(tag) {
      if (!isString(tag)) {
        if (self.debugMode) {
          const logger = getEnv(self).logger;
          if (logger) {
            logger.Error(`PostStore@SearchPostsByContent(): Given query string is not a string.`);
          } else {
            console.error(`PostStore@SearchPostsByContent(): Given query string is not a string.`);
          }
        }

        return [];
      }

      return values(self.posts).filter((p) => p.tags.includes(tag));
    },
    /**
     * Searches posts for tags that contain the given query string.
     * @param {String} query The text to search the post tags for.
     */
    searchPostsByTagText(query) {
      if (!isString(query)) {
        if (self.debugMode) {
          const logger = getEnv(self).logger;
          if (logger) {
            logger.Error(`PostStore@SearchPostsByTagText(): Given query string is not a string.`);
          } else {
            console.error(`PostStore@SearchPostsByTagText(): Given query string is not a string.`);
          }
        }

        return [];
      }

      return values(self.posts).filter((p) => p.tags.join().includes(query));
    },
    /**
     * Searches for posts that contain the given query string in their title.
     * @param {String} query The query string to search for.
     */
    searchPostsByTitle(query) {
      if (!isString(query)) {
        if (self.debugMode) {
          const logger = getEnv(self).logger;
          if (logger) {
            logger.Error(`PostStore@SearchPostsByTitle(): Given query string is not a string.`);
          } else {
            console.error(`PostStore@SearchPostsByTitle(): Given query string is not a string.`);
          }
        }

        return [];
      }

      const test = '';

      return values(self.posts).filter((p) => p.title.includes(query));
    },
    /**
     * Searches for posts containing the given query string in their content body.
     * @param {String} query The query string to search for.
     */
    searchPostsByContent(query) {
      if (!isString(query)) {
        if (self.debugMode) {
          const logger = getEnv(self).logger;
          if (logger) {
            logger.Error(`PostStore@SearchPostsByContent(): Given query string is not a string.`);
          } else {
            console.error(`PostStore@SearchPostsByContent(): Given query string is not a string.`);
          }
        }

        return [];
      }

      return values(self.posts).filter((p) => p.content.includes(query));
    },
    /**
     * Searches for posts containing the given query string in their Title, Content, or Tag list.
     * @param {String} query The query string to search for.
     */
    searchPostsByString(query) {
      if (!isString(query)) {
        if (self.debugMode) {
          const logger = getEnv(self).logger;
          if (logger) {
            logger.Error(`PostStore@SearchPostsByString(): Given query string is not a string.`);
          } else {
            console.error(`PostStore@SearchPostsByString(): Given query string is not a string.`);
          }
        }

        return [];
      }

      return values(self.posts).filter(
        (p) =>
          p.content.includes(query) || p.title.includes(query) || p.tags.join().includes(query),
      );
    },
  }))
  .actions((self) => ({
    setDebugMode(mode) {
      if (!isBoolean(mode)) return;

      self.debugMode = mode;
    },
    addPost(post) {
      if (!post) {
        if (self.debugMode) {
          const logger = getEnv(self).logger;
          if (logger) {
            logger.Error(`PostStore@AddPost(): Given post is not defined.`);
          } else {
            console.error(`PostStore@AddPost(): Given post is not defined.`);
          }
        }

        return;
      }

      if (isStateTreeNode(post)) {
        return self.posts.put(post);
      }

      let result = true;
      try {
        typecheck(Post, post);
      } catch {
        result = false;
      }

      if (result) {
        const created = Post.create(post);
        return self.posts.put(created);
      }

      if (self.debugMode) {
        const logger = getEnv(self).logger;
        if (logger) {
          logger.Error(`PostStore@AddPost(): Given post is not valid.`);
        } else {
          console.error(`PostStore@AddPost(): Given post is not valid.`);
        }
      }
    },
    removePost(post) {
      if (!post) {
        if (self.debugMode) {
          const logger = getEnv(self).logger;
          if (logger) {
            logger.Error(`PostStore@RemovePost(): Given post is not defined.`);
          } else {
            console.error(`PostStore@RemovePost(): Given post is not defined.`);
          }
        }

        return;
      }

      return self.posts.delete(post);
    },
  }));
