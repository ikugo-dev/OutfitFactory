import { type PostType, type UserType } from "./types.ts";

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
