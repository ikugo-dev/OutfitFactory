export interface ArticleType {
  id: number;
  imageUrl: string;
  gender: string;
  category: string;
  name: string;
  color: string[];
  material: string;
  price: number;
  brand: string;
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
  profilePicture: string;
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
