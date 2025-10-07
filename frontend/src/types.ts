export type Ref<T> = string | T;

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  posts: Ref<PostType>[];
  followers: Ref<UserType>[];
  following: Ref<UserType>[];
  liked: Ref<PostType>[];
  closet: Ref<GarmentType>[];
  outfits: Ref<OutfitType>[];
}

export interface CommentType {
  _id: string;
  user: Ref<UserType>;
  text: string;
  likes: number;
  likers: Ref<UserType>[];
}

export interface GarmentType {
  _id: string;
  images: string[];
  category: string | null;
  color: string[];
  material: string[];
  gender: string[];
  brand: string;
}

export interface GradeType {
  _id: string;
  user: Ref<UserType>;
  fit_quality: number;
  material_quality: number;
  design: number;
  comfort: number;
}

export interface OutfitType {
  _id: string;
  owner: Ref<UserType>;
  garments: Ref<GarmentType>[];
}

export interface PostType {
  _id: string;
  user: Ref<UserType>;
  outfit: Ref<OutfitType>;
  text: string | null;
  likes: number;
  likers: Ref<UserType>[];
  comments: Ref<CommentType>[];
  grades: Ref<GradeType>[];
}
