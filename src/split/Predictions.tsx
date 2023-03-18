import { FC, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { apiClient } from "../ApiClient";
import { Prediction } from "../types";
import { MovieItem } from "./MovieItem";
import { SpinnerSection } from "./Spinner";
import { ratingState } from "./User";

const predict = async (inputs: any) => {
  const response = await apiClient.post<Prediction[]>(`/predict`, {
    apiKey: localStorage.getItem("apiKey"),
    modelId: localStorage.getItem("modelId"),
    inputs,
  });
  return response.data;
};

export const Predictions: FC = () => {
  const rating = useRecoilValue(ratingState);

  const {
    data: predictions,
    isLoading,
    refetch,
    remove,
  } = useQuery(
    ["predictions"],
    () =>
      predict({ userId: rating?.userId.toString(), gender: rating?.gender }),
    {
      enabled: false,
      keepPreviousData: false,
    }
  );

  useEffect(() => {
    remove();
    if (rating) {
      refetch();
    }
  }, [remove, rating, refetch]);

  return (
    <div className="user">
      <h2>Recomendaciones</h2>

      <div className="user-body">
        {isLoading && <SpinnerSection />}

        {predictions && (
          <div className="movies-grid">
            {predictions.map((p) => (
              <MovieItem key={p.candidate.movieId} movie={p.candidate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
