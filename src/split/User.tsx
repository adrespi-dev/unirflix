import { FC, useState } from "react";
import { useQuery } from "react-query";
import { apiClient } from "../ApiClient";
import { Movie, Rating } from "../types";
import { ReactComponent as Search } from "./search.svg";
import { SpinnerSection } from "./Spinner";

const getUser = async (search: string) => {
  const response = await apiClient.get<Rating[]>(`/user/${search}`);
  return response.data;
};

export const User: FC = () => {
  const [search, setSearch] = useState("");
  const {
    data: ratings,
    isLoading,
    refetch,
  } = useQuery(["search"], () => getUser(search), {
    enabled: false,
  });

  const onSubmit = () => {
    refetch();
  };

  return (
    <div className="user">
      <h2>Buscar usuario</h2>

      <div className="user-body">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}>
          <div className="input">
            <Search />
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </form>

        {isLoading && <SpinnerSection />}

        {ratings && (
          <div className="movies-grid">
            {ratings.map((r) => (
              <MovieItem movie={r.movie} rating={r.rating} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function split_at_index(value: string, index: number) {
  return [
    value.substring(0, index),
    value.substring(index).replace("(", "").replace(")", ""),
  ];
}

const MovieItem: FC<{ movie: Movie; rating: number }> = ({ movie, rating }) => {
  const [title] = split_at_index(movie.title, movie.title.length - 6);

  const [isError, setIsError] = useState(false);

  const url = isError
    ? "/assets/placeholder.jpg"
    : `/assets/${movie.movieId}.jpg`;

  return (
    <div className="movie">
      <div className="movie-rating">{rating}</div>

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
