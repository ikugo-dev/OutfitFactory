export interface ArticleType {
  id: number;
  brand: string;
  name: string;
  type: string;
  gender: string;
  price: number;
  colour: string[];
}

export interface OutfitType {
  id: number;
  name: string;
  clothes: ArticleType[];
}

export interface UserType {
  id: number;
  username: string;
  password: string;
  email: string;
  profilePicture: string; // ImageData ???
  followers: number;
  following: UserType[];
}

export interface CommentType {
  id: number;
  user: UserType;
  text: string;
  likes: number;
}

export interface PostType {
  id: number;
  user: UserType;
  outfit: OutfitType | undefined;
  likes: number;
  comments: CommentType[] | undefined;
  visible: boolean;
}
