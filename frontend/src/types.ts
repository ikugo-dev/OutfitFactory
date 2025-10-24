export type Ref<T> = string | T;

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  posts: (string | PostType)[];
  followers: (string | UserType)[];
  following: (string | UserType)[];
  liked: (string | PostType)[];
  closet: (string | GarmentType)[];
  outfits: (string | OutfitType)[];
}

export interface CommentType {
  _id: string;
  user: string | UserType;
  text: string;
  likes: number;
  likers: (string | UserType)[];
}

export interface GarmentType {
  _id: string;
  image_url: string;
  gender: string;
  category: string;
  name: string;
  color: string;
  material: string;
  price: number;
  brand: string;
}

export interface GradeType {
  _id: string;
  user: string | UserType;
  fit_quality: number;
  material_quality: number;
  design: number;
  comfort: number;
}

export interface OutfitType {
  _id: string;
  owner: string | UserType;
  garments: (string | GarmentType)[];
}

export interface PostType {
  _id: string;
  user: string | UserType;
  outfit: string | OutfitType;
  text: string | null;
  likes: number;
  likers: (string | UserType)[];
  comments: (string | CommentType)[];
  grades: (string | GradeType)[];
  createdAt: string;
}
