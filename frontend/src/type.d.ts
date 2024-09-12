export interface Artist {
    _id: string;
    name: string;
    photo: string;
    information: string;
}

export interface Album {
  _id: string;
  name: string;
  photo: string;
  artist: string;
  year: number;
}