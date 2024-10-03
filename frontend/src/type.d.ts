export interface Artist {
  _id: string;
  name: string;
  photo: string;
  information: string;
  isPublished: boolean;
}

export interface Album {
  _id: string;
  name: string;
  photo: string;
  artist: string;
  year: number;
  isPublished: boolean;
}

export interface Track {
  _id: string;
  name: string;
  album: string;
  duration: string;
  trackNumber: string;
  isPublished: boolean;
}

export interface RegisterMutation {
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface trackHistory {
  artist: Artist;
  track: Track;
  datetime: Date;
}

export interface ArtistMutation {
  name: string;
  info: string;
  photo: File | null;
}

export interface AlbumMutation {
  name: string;
  photo: File | null;
  artist: string;
  year: number;
}

export interface TrackMutation {
  name: string;
  duration: string;
  trackNumber: number;
  artist: string;
  album: string;
}