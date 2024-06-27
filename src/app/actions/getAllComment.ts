"use server";

import { google, youtube_v3 } from "googleapis";
import _ from "lodash";
import { IComment, IOptions } from "../interface/types";

async function getVideoComments(videoId: string, options: IOptions) {
  const API_KEY = process.env.API_KEY;
  const youtube = google.youtube({
    version: "v3",
    auth: API_KEY,
  });

  let comments: IComment[] = [];
  let nextPageToken: string | undefined = "";

  while (nextPageToken !== null) {
    const response: any = await youtube.commentThreads.list({
      part: ["snippet"],
      videoId: videoId,
      pageToken: nextPageToken,
    });

    const response_data: youtube_v3.Schema$CommentThreadListResponse =
      response.data;

    if (response_data.items) {
      response_data.items.forEach((item) => {
        const comment = item.snippet?.topLevelComment?.snippet;

        if (comment) {
          comments.push({
            authorDisplayName: comment.authorDisplayName ?? "",
            authorChannelId: comment.authorChannelId?.value ?? "",
            publishedAt: comment.publishedAt ?? "",
            updatedAt: comment.updatedAt ?? "",
            likeCount: comment.likeCount ?? 0,
            textDisplay: comment.textDisplay ?? "",
            authorProfileImageUrl: comment.authorProfileImageUrl ?? "",
          });
        }
      });
    }

    nextPageToken = response.data.nextPageToken || null;
  }

  const filterUniqueComments = (comments: IComment[]): IComment[] => {
    return _.uniqBy(comments, "authorChannelId");
  };

  if (options.allowDuplicates) {
    return comments;
  }

  if (!options.allowDuplicates) {
    const uniqueFilter = filterUniqueComments(comments);
    return uniqueFilter;
  }
}

export default getVideoComments;
