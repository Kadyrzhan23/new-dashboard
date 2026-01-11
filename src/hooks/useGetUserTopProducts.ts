import { useEffect, useReducer } from "react";
import { getUserTopProducts } from "../services/goods";
import type { TopProduct } from "../types/goods";

interface TopProductsState {
  data: TopProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: TopProductsState = {
  data: [],
  loading: false,
  error: null,
};

type Action = "FETCH_START" | "FETCH_SUCCESS" | "FETCH_ERROR";

function reducer(state: any, action: { type: Action; payload?: any }) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useGetUserTopProducts(userId: string) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_START" });

    getUserTopProducts(userId)
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((err) =>{
      console.log(err)
        dispatch({
          type: "FETCH_ERROR",
          payload:
            err instanceof Error
              ? err.message
              : "Не удалось загрузить топ продукты пользователя",
        })}
      );
  }, [userId]);

  return state;
}