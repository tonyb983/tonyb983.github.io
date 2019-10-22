import React, { useState } from 'react';
import { forOwn, reduce, map } from 'lodash';
import { useStore } from '../Providers/StoreProvider';

const TagsPage = (props) => {
  const [showCounts, setShowCounts] = useState(false);
  const { blog } = useStore();
  const content = showCounts ? (
    <ol>
      {map(blog.tagCounts, (count, tag) => (
        <li key={tag}>
          {tag}:{count}
        </li>
      ))}
    </ol>
  ) : (
    <ol>
      {blog.allTags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ol>
  );

  return (
    <div className="TagsPage">
      <div style={{ alignItems: 'center' }}>
        <button onClick={() => setShowCounts(!showCounts)}>Show Counts</button>
      </div>
      <p />
      {content}
    </div>
  );
};

export default TagsPage;
