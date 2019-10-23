import { values } from 'mobx';
import { types, getEnv, isStateTreeNode, typecheck } from 'mobx-state-tree';
import { isString, isBoolean, head, has } from 'lodash';
import { Post } from './PostModel';

export const Blog = types
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
    get tagCounts() {
      const result = {};
      values(self.posts).forEach((post) => {
        post.tags.forEach((tag) => {
          if (has(result, tag)) {
            result[tag] += 1;
          } else {
            result[tag] = 0;
          }
        });
      });
      return result;
    },
    get allPosts() {
      return values(self.posts);
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
      if (!tag || !isString(tag)) {
        if (self.debugMode) {
          console.error('PostStore@SearchPostsByContent(): Given query string is not a string.');
        }

        return [];
      }

      return values(self.posts).filter((p) => p.tags.includes(tag));
    },
    firstPostByTag(tag) {
      if (!tag || !isString(tag)) {
        if (self.debugMode) {
          console.error('PostStore@SearchPostsByContent(): Given query string is not a string.');
        }

        return undefined;
      }

      return head(values(self.posts).filter((p) => p.tags.includes(tag)));
    },
    /**
     * Searches posts for tags that contain the given query string.
     * @param {String} query The text to search the post tags for.
     */
    searchPostsByTagText(query) {
      if (!query || !isString(query)) {
        if (self.debugMode) {
          console.error('PostStore@SearchPostsByTagText(): Given query string is not a string.');
        }

        return [];
      }

      return values(self.posts).filter((p) => p.tags.join().includes(query));
    },
    firstPostByTagText(query) {
      if (!query || !isString(query)) {
        if (self.debugMode) {
          console.error('PostStore@SearchPostsByTagText(): Given query string is not a string.');
        }

        return undefined;
      }

      return head(values(self.posts).filter((p) => p.tags.join().includes(query)));
    },
    /**
     * Searches for posts that contain the given query string in their title.
     * @param {String} query The query string to search for.
     */
    searchPostsByTitle(query) {
      if (!query || !isString(query)) {
        if (self.debugMode) {
          console.error('PostStore@SearchPostsByTitle(): Given query string is not a string.');
        }

        return [];
      }

      return values(self.posts).filter((p) => p.title.includes(query));
    },
    firstPostByTitle(query) {
      if (!query || !isString(query)) {
        if (self.debugMode) {
          console.error('PostStore@SearchPostsByTitle(): Given query string is not a string.');
        }

        return undefined;
      }

      return head(values(self.posts).filter((p) => p.title.includes(query)));
    },
    /**
     * Searches for posts containing the given query string in their content body.
     * @param {String} query The query string to search for.
     */
    searchPostsByContent(query) {
      if (!query || !isString(query)) {
        if (self.debugMode) {
          console.error('PostStore@SearchPostsByContent(): Given query string is not a string.');
        }

        return [];
      }

      return values(self.posts).filter((p) => p.content.includes(query));
    },
    firstPostByContent(query) {
      if (!query || !isString(query)) {
        if (self.debugMode) {
          console.error('PostStore@SearchPostsByContent(): Given query string is not a string.');
        }

        return undefined;
      }

      return head(values(self.posts).filter((p) => p.content.includes(query)));
    },
    /**
     * Searches for posts containing the given query string in their Title, Content, or Tag list.
     * @param {String} query The query string to search for.
     */
    searchPostsByString(query) {
      if (!query || !isString(query)) {
        if (self.debugMode) {
          console.error('PostStore@SearchPostsByString(): Given query string is not a string.');
        }

        return [];
      }

      return values(self.posts).filter(
        (p) =>
          p.content.includes(query) || p.title.includes(query) || p.tags.join().includes(query),
      );
    },
    firstPostByString(query) {
      if (!query || !isString(query)) {
        if (self.debugMode) {
          console.error('PostStore@SearchPostsByString(): Given query string is not a string.');
        }

        return undefined;
      }

      return head(
        values(self.posts).filter(
          (p) =>
            p.content.includes(query) || p.title.includes(query) || p.tags.join().includes(query),
        ),
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
          console.error('PostStore@AddPost(): Given post is not defined.');
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
        console.error('PostStore@AddPost(): Given post is not valid.');
      }
    },
    removePost(post) {
      if (!post) {
        if (self.debugMode) {
          const logger = getEnv(self).logger;
          if (logger) {
            logger.Error('PostStore@RemovePost(): Given post is not defined.');
          } else {
            console.error('PostStore@RemovePost(): Given post is not defined.');
          }
        }

        return;
      }

      return self.posts.delete(post);
    },
  }));
