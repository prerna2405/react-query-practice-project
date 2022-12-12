import { useState } from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  const [refetchInterval, setRefetchInterval] = useState(3000);
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(1);

  const onSuccess = (data) => {
    console.log(data);
    setEnabled(true);
    setCount(count + 1);
    if (count > 3) {
      setRefetchInterval(false);
    }
    console.log("Perform side effect as success callback");
  };

  const onError = () => {
    console.log("Perform side effect after encountering error");
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError,
    enabled,
    refetchInterval
  );
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
