import {
  type ArticleType,
  type OutfitType,
  type PostType,
  type UserType,
} from "./types.ts";

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

export function fetchAllArticles(): Promise<ArticleType[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(clothingPool), 1000);
  });
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const fakeUsers: UserType[] = [
  {
    id: 1,
    username: "alexlynx",
    password: "hashedpass1",
    email: "alex@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    followers: 230,
    following: [],
  },
  {
    id: 2,
    username: "fashionfiend",
    password: "hashedpass2",
    email: "fiend@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/55.jpg",
    followers: 542,
    following: [],
  },
  {
    id: 3,
    username: "streetvibe",
    password: "hashedpass3",
    email: "vibe@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
    followers: 180,
    following: [],
  },
  {
    id: 4,
    username: "runwaydream",
    password: "hashedpass4",
    email: "dream@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/65.jpg",
    followers: 710,
    following: [],
  },
];

// populate the `following` arrays (a small loop for mutuals)
fakeUsers.forEach((u) => {
  u.following = fakeUsers.filter((v) => v.id !== u.id && Math.random() > 0.6);
});

// --- Mock Clothing Articles --------------------------------------------------

import { clothingPool } from "./MOCK_DATA.ts";

// --- Outfit generator --------------------------------------------------------

function randomOutfit(): OutfitType {
  const outfit: OutfitType = {
    id: Math.floor(Math.random() * 100000),
    name: "Random Outfit",
    clothes: [],
  };

  for (let i = 0; i < 6; i++) {
    if (Math.random() > 0.2) {
      outfit.clothes.push(randomItem(clothingPool));
    }
  }
  return outfit;
}

// --- Posts -------------------------------------------------------------------

export function getFakePosts(count = 5): PostType[] {
  const captions = [
    "Street casual vibes today.",
    "Simple layers, bold mood.",
    "Autumn tones are back!",
    "Minimalist monochrome outfit.",
    "Trying something new with textures.",
  ];

  const posts: PostType[] = [];
  for (let i = 0; i < count; i++) {
    const user = randomItem(fakeUsers);
    const outfit = randomOutfit();

    posts.push({
      id: i + 1,
      user,
      outfit,
      caption: randomItem(captions),
      likes: Math.floor(Math.random() * 500),
      comments: [],
      visible: true,
    });
  }

  return posts;
}
