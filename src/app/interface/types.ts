export type IComment = {
  authorDisplayName: string;
  authorChannelId: string;
  publishedAt: string;
  updatedAt: string;
  likeCount: string | number;
  textDisplay: string;
  authorProfileImageUrl: string;
};

export type IOptions = {
  allowDuplicates: boolean;
  includeReplies: boolean;
};
