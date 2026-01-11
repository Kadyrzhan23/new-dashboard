import { useEffect, useReducer } from "react";
import { getUserOrdersAnalytics } from "../services/orders";
import type { UserOrdersAnalytics } from "../types/order";

interface AnalyticsState {
  data: UserOrdersAnalytics | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  data: null,
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

export function useGetUserOrderAnalytics(userId: string) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: "FETCH_START" });

    getUserOrdersAnalytics(userId)
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((err) =>
        dispatch({
          type: "FETCH_ERROR",
          payload:
            err instanceof Error
              ? err.message
              : "Не удалось загрузить аналитику заказов пользователя",
        })
      );
  }, [userId]);

  return state;
}

