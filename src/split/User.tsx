import { FC, useState } from "react";
import { useQuery } from "react-query";
import { atom, useRecoilState } from "recoil";
import { apiClient } from "../ApiClient";
import { Rating } from "../types";
import { MovieItem } from "./MovieItem";
import { ReactComponent as Search } from "./search.svg";
import { SpinnerSection } from "./Spinner";

export const ratingState = atom<Rating | null>({
  key: "rating",
  default: null,
});

const getUser = async (search: string) => {
  const response = await apiClient.get<Rating[]>(`/user/${search}`);
  return response.data;
};

export const User: FC = () => {
  const [_, setRating] = useRecoilState(ratingState);
  const [search, setSearch] = useState("");
  const {
    data: ratings,
    isLoading,
    refetch,
  } = useQuery(["search"], () => getUser(search), {
    enabled: false,
    onSuccess: (data) => {
      setRating(data[0]);
    },
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
              <MovieItem key={r.movieId} movie={r.movie} rating={r.rating} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
