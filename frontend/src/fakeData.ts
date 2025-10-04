import { type ArticleType, type PostType, type UserType } from "./types.ts";

export function getFakeUser(): UserType {
  return {
    id: 69,
    username: "FakeUser",
    password: "pswrd123",
    email: "fakeemail@email.com",
    followers: 360,
    following: [],
    profilePicture: "",
  } as UserType;
}

export function getFakePost(id: number): PostType {
  return {
    id: id,
    user: getFakeUser(),
    likes: 420,
    visible: true,
  } as PostType;
}
export function getFakePosts(amount: number): PostType[] {
  return Array.from({ length: amount }, (_, i) => getFakePost(i + 1));
}

const mockArticles: ArticleType[] = [{
  id: 1,
  imageUrl: "",
  gender: "male",
  category: "top",
  name: "Striped Tee",
  color: ["red", "white"],
  material: "cotton",
  price: 25,
  brand: "BrandA",
}, {
  id: 2,
  imageUrl: "",
  gender: "female",
  category: "bottom",
  name: "Denim Skirt",
  color: ["blue"],
  material: "denim",
  price: 45,
  brand: "BrandA",
}, {
  id: 3,
  imageUrl: "",
  gender: "unisex",
  category: "shoes",
  name: "Sneakers",
  color: ["white"],
  material: "leather",
  price: 70,
  brand: "BrandA",
}, {
  id: 4,
  imageUrl: "",
  gender: "female",
  category: "jacket",
  name: "Leather Jacket",
  color: ["black"],
  material: "leather",
  price: 150,
  brand: "BrandA",
}, {
  id: 5,
  imageUrl: "",
  gender: "male",
  category: "accessory",
  name: "Beanie",
  color: ["green"],
  material: "wool",
  price: 15,
  brand: "BrandA",
}, {
  id: 6,
  imageUrl: "",
  gender: "female",
  category: "accessory",
  name: "Sunglasses",
  color: ["black"],
  material: "plastic",
  price: 30,
  brand: "BrandA",
}];

export function fetchAllArticles(): Promise<ArticleType[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockArticles), 1000);
  });
}
