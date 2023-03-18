import { FC, useState } from "react";
import { Movie } from "../types";

export const MovieItem: FC<{ movie: Movie; rating?: number }> = ({
  movie,
  rating,
}) => {
  const [title] = split_at_index(movie.title, movie.title.length - 6);

  const [isError, setIsError] = useState(false);

  const url = isError
    ? "/assets/placeholder.jpg"
    : `/assets/${movie.movieId}.jpg`;

  return (
    <div className="movie">
      {rating && <div className="movie-rating">{rating}</div>}

      <div className="movie-img">
        <img onError={() => setIsError(true)} alt="poster" src={url} />
      </div>

      <div className="movie-genres-wrapper">
        <div
          className={`movie-genres ${
            movie.genres.length === 1 ? "just-one" : ""
          } `}>
          {movie.genres.map((g) => (
            <div className="movie-genre">{g}</div>
          ))}
        </div>

        {movie.genres.length > 1 && (
          <div className="movie-genres movie-genres-float">
            {movie.genres.map((g) => (
              <div className="movie-genre">{g}</div>
            ))}
          </div>
        )}
      </div>
      <div className="movie-title">{title}</div>
    </div>
  );
};

function split_at_index(value: string, index: number) {
  return [
    value.substring(0, index),
    value.substring(index).replace("(", "").replace(")", ""),
  ];
}
