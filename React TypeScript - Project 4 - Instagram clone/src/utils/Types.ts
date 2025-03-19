export type PostType = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  imgUrl: string;
  userName: string;
  profileImg: string;
};

export type PostsPageType = {
  posts: PostType[];
  pagesNumber: number;
};

export type ProfileType = {
  _id: string;
  userName: string;
  profileImg: string;
  description: string;
};

export type ProfilePageType = ProfileType & {
  posts: PostType[];
};

export type CommentType = {
  _id: string;
  commentBody: string;
  Author: Omit<ProfileType, 'description'>;
};

export type searchUserResultType = Omit<ProfileType, 'description'>;
