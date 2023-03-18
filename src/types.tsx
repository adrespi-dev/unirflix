export type Rating = {
  _id: string;
  userId: number;
  movieId: number;
  rating: number;
  gender: string;
  movie: Movie;
};

export type Movie = {
  movieId: number;
  title: string;
  genres: string[];
  _id: string;
};

export type Prediction = {
  candidate: Movie;
  ranking: number;
};
