import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (
  onSuccess,
  onError,
  enabled,
  refetchInterval
) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    cacheTime: 300000,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    refetchInterval,
    refetchIntervalInBackground: false,
    enabled,
    onSuccess,
    onError,
    // select: (data) => {
    //   let names = data.data.map((hero) => hero.name);
    //   return names;
    // },
  });
};
