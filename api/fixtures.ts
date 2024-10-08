import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import mongoose from "mongoose";

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  const collections = ["artists", "albums", "tracks", "users"];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  await User.create(
    {
      username: "admin@gmail.com",
      password: "123321",
      confirmPassword: "123321",
      role: "admin",
      token: crypto.randomUUID(),
      displayName: "admin",
    },
    {
      username: "user@gmail.com",
      password: "123321",
      confirmPassword: "123321",
      token: crypto.randomUUID(),
      displayName: "user",
    }
  );

  const [Miyagi, Scriptonit, Djigan] = await Artist.create(
    {
      name: "Miyagi",
      info: "Rap",
      photo: "fixtures/miyagi.webp",
      isPublished: true,
    },
    {
      name: "Scriptonit",
      info: "Rap",
      photo: "fixtures/scriptonit.jpg",
      isPublished: true,
    },
    {
      name: "Djigan",
      info: "Rap",
      photo: "fixtures/gigan.jpg",
      isPublished: false,
    }
  );

  const [Hajime, Yamakasi, Uroboros, House, Cold_Hear] = await Album.create(
    {
      name: "Hajime",
      artist: Miyagi,
      year: 2020,
      photo: "fixtures/hajime.jpeg",
      isPublished: true,
    },
    {
      name: "Yamakasi",
      artist: Miyagi,
      year: 2020,
      photo: "fixtures/yamakasi.jpeg",
      isPublished: true,
    },
    {
      name: " Uroboros",
      artist: Scriptonit,
      year: 2018,
      photo: "fixtures/uroboros.jpeg",
      isPublished: true,
    },
    {
      name: " House",
      artist: Scriptonit,
      year: 2018,
      photo: "fixtures/house.jpg",
      isPublished: true,
    },
    {
      name: "Холодное сердце",
      artist: Djigan,
      year: 2012,
      photo: "fixtures/coldheart.jpeg",
      isPublished: false,
    }
  );

  await Track.create(
    {
      name: "Колизей",
      album: Hajime,
      duration: "4:07",
      trackNumber: 1,
      isPublished: true,
    },
    {
      name: "я хочу любить",
      album: Hajime,
      duration: "4:07",
      trackNumber: 2,
      isPublished: true,
    },
    {
      name: "fire man",
      album: Hajime,
      duration: "4:07",
      trackNumber: 3,
      isPublished: true,
    },
    {
      name: "дама",
      album: Hajime,
      duration: "4:07",
      trackNumber: 4,
      isPublished: true,
    },
    {
      name: "фея",
      album: Hajime,
      duration: "4:07",
      trackNumber: 5,
      isPublished: true,
    },
    {
      name: "atlant",
      album: Yamakasi,
      duration: "4:07",
      trackNumber: 1,
      isPublished: true,
    },
    {
      name: "utopia",
      album: Yamakasi,
      duration: "4:07",
      trackNumber: 2,
      isPublished: true,
    },
    {
      name: "мало нам",
      album: Yamakasi,
      duration: "4:07",
      trackNumber: 3,
      isPublished: true,
    },
    {
      name: "medicine",
      album: Yamakasi,
      duration: "4:07",
      trackNumber: 4,
      isPublished: true,
    },
    {
      name: "tantra",
      album: Yamakasi,
      duration: "4:07",
      trackNumber: 5,
      isPublished: true,
    },
    {
      name: "животные",
      album: Uroboros,
      duration: "4:07",
      trackNumber: 1,
      isPublished: true,
    },
    {
      name: "мистер 718",
      album: Uroboros,
      duration: "4:07",
      trackNumber: 2,
      isPublished: true,
    },
    {
      name: "пацан",
      album: Uroboros,
      duration: "4:07",
      trackNumber: 3,
      isPublished: true,
    },
    {
      name: "сливочное масло",
      album: Uroboros,
      duration: "4:07",
      trackNumber: 4,
      isPublished: true,
    },
    {
      name: "положение",
      album: Uroboros,
      duration: "4:07",
      trackNumber: 5,
      isPublished: true,
    },
    {
      name: "дома",
      album: House,
      duration: "4:07",
      trackNumber: 1,
      isPublished: true,
    },
    {
      name: "оставь это нам",
      album: House,
      duration: "4:07",
      trackNumber: 2,
      isPublished: true,
    },
    {
      name: "вниз",
      album: House,
      duration: "4:07",
      trackNumber: 3,
      isPublished: true,
    },
    {
      name: "притон",
      album: House,
      duration: "4:07",
      trackNumber: 4,
      isPublished: true,
    },
    {
      name: "танцуй сама",
      album: House,
      duration: "4:07",
      trackNumber: 5,
      isPublished: true,
    },
    {
      name: "Отпусти",
      album: Cold_Hear,
      duration: "4:07",
      trackNumber: 1,
      isPublished: false,
    },
    {
      name: "Холодное сердце",
      album: Cold_Hear,
      duration: "4:07",
      trackNumber: 2,
      isPublished: false,
    },
    {
      name: "Ты рядом",
      album: Cold_Hear,
      duration: "4:07",
      trackNumber: 3,
      isPublished: false,
    }
  );

  await db.close();
};

void run();
