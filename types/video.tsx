import { user } from "./user";
export interface videos {
  videoPost: {
    _id: string;
    caption: string;
    category: string;
    likes: any;
    comments: {
      comment: string;
      commentedBy: user;
    }[];
    video: string;
    postedBy: user;
  }[];
}

export interface video {
  post: {
    _id: string;
    caption: string;
    category: string;
    likes: any;
    comments: {
      comment: string;
      commentedBy: user;
    }[];
    video: string;
    postedBy: user;
  };
}

export interface comment {
  comment: string;
  commentedBy: user;
  _id: string;
}
[];
