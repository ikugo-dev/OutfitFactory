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
// export function getFakePosts(amount: number): PostType[] {
//   return Array.from({ length: amount }, (_, i) => getFakePost(i + 1));
// }

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

// --- Helper utilities --------------------------------------------------------

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomColor(): string[] {
  const colors = [
    "red",
    "blue",
    "green",
    "black",
    "white",
    "gray",
    "beige",
    "brown",
  ];
  const count = Math.random() > 0.8 ? 2 : 1;
  return Array.from({ length: count }, () => randomItem(colors));
}

function randomMaterial(): string {
  const materials = [
    "cotton",
    "denim",
    "wool",
    "leather",
    "polyester",
    "silk",
    "linen",
  ];
  return randomItem(materials);
}

function randomGender(): string {
  return Math.random() > 0.5 ? "male" : "female";
}

// --- Mock Users --------------------------------------------------------------

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

export const clothingPool: ArticleType[] = [
  {
    id: 101,
    imageUrl:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&w=400",
    gender: "unisex",
    category: "top",
    name: "White T-Shirt",
    color: ["white"],
    material: "cotton",
    price: 15,
    brand: "Uniqlo",
  },
  {
    id: 102,
    imageUrl:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&w=400",
    gender: "male",
    category: "jacket",
    name: "Denim Jacket",
    color: ["blue"],
    material: "denim",
    price: 89,
    brand: "Levi’s",
  },
  {
    id: 103,
    imageUrl:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3b1d?auto=format&w=400",
    gender: "female",
    category: "bottom",
    name: "Black Jeans",
    color: ["black"],
    material: "denim",
    price: 45,
    brand: "Zara",
  },
  {
    id: 104,
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&w=400",
    gender: "unisex",
    category: "shoes",
    name: "Sneakers",
    color: ["white", "gray"],
    material: "canvas",
    price: 120,
    brand: "Nike",
  },
  {
    id: 105,
    imageUrl:
      "https://images.unsplash.com/photo-1600180758890-6d32c8b2e54e?auto=format&w=400",
    gender: "female",
    category: "accessory",
    name: "Silver Necklace",
    color: ["silver"],
    material: "metal",
    price: 12,
    brand: "H&M",
  },
  {
    id: 106,
    imageUrl:
      "https://images.unsplash.com/photo-1600180758890-6d32c8b2e54e?auto=format&w=400",
    gender: "male",
    category: "accessory",
    name: "Leather Belt",
    color: ["brown"],
    material: "leather",
    price: 200,
    brand: "Gucci",
  },
  {
    id: 107,
    imageUrl:
      "https://images.unsplash.com/photo-1580910051074-d19d6b2d2d6b?auto=format&w=400",
    gender: "unisex",
    category: "top",
    name: "Red Hoodie",
    color: ["red"],
    material: "cotton",
    price: 60,
    brand: "Champion",
  },
  {
    id: 108,
    imageUrl:
      "https://images.unsplash.com/photo-1618354691417-85efc43d31d4?auto=format&w=400",
    gender: "male",
    category: "bottom",
    name: "Cargo Pants",
    color: ["green"],
    material: "cotton",
    price: 75,
    brand: "Adidas",
  },
  {
    id: 109,
    imageUrl:
      "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&w=400",
    gender: "female",
    category: "shoes",
    name: "Chelsea Boots",
    color: ["black"],
    material: "leather",
    price: 150,
    brand: "Dr. Martens",
  },
  {
    id: 110,
    imageUrl:
      "https://images.unsplash.com/photo-1615223936277-fd1b1f1fc4a4?auto=format&w=400",
    gender: "unisex",
    category: "accessory",
    name: "Beanie Hat",
    color: ["gray"],
    material: "wool",
    price: 25,
    brand: "Carhartt",
  },
];

// --- Outfit generator --------------------------------------------------------

function randomOutfit(): OutfitType {
  const outfit: OutfitType = {
    id: Math.floor(Math.random() * 100000),
    name: "Random Outfit",
    clothes: [],
  };

  const categories = ["top", "bottom", "jacket", "shoes"];
  for (const cat of categories) {
    const items = clothingPool.filter((c) => c.category === cat);
    if (items.length) outfit.clothes.push(randomItem(items));
  }

  const accessories = clothingPool.filter((c) => c.category === "accessory");
  outfit.clothes.push(randomItem(accessories));
  if (Math.random() > 0.5) outfit.clothes.push(randomItem(accessories));

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
