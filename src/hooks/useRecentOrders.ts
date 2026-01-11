import { useEffect, useReducer } from "react";
import { getRecentOrders } from "../services/orders";
import type { RecentOrder } from "../types/order";



interface RecentOrdersState {
  data: RecentOrder[];
  loading: boolean;
  error: string | null;
}

const initialState : RecentOrdersState = {
  data:[],
  loading: false,
  error:  null,
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

export function useRecentOrders() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_START" });

    getRecentOrders()
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((err) =>dispatch({
        type: "FETCH_ERROR",
        payload:
          err instanceof Error
            ? err.message
            : "Не удалось загрузить заказы",
      }));
  }, []);

  return state;
}
