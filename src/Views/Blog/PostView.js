import React from 'react';
import { observer } from 'mobx-react-lite';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, Heading, Divider, Text, Badge, Hug, Banner } from 'pcln-design-system';

const PostView = ({ post }) => {
  if (!post) {
    return (
      <Banner
        data-testid="PostViewError"
        p={2}
        color="error"
        iconName="Warning"
        text="Error displaying post."
      />
    );
  }

  const { title, content, tags = [], created } = post;

  return (
    <Card data-testid="PostView" p={4} borderWidth={0}>
      <Hug data-testid="PostViewDate">
        {formatDistanceToNow(created, { addSuffix: true, includeSeconds: true })}
      </Hug>
      <Heading data-testid="PostViewTitle">{title}</Heading>
      <Divider />
      <Text data-testid="PostViewContent" fontSize={4}>
        {content}
      </Text>
      {tags.length > 0 &&
        tags.map((tag, i) => (
          <Badge data-testid={`PostViewTag${i}`} key={tag} p={1} mt={2} mr={2} bg="lightPurple">
            {tag}
          </Badge>
        ))}
    </Card>
  );
};

export default observer(PostView);
