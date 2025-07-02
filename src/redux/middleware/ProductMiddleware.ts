import { Middleware } from "redux";

const STATE_TIME = 60 * 1000; // clearn after a minute

export const queryCacheCleaner: Middleware =
  (store) => (next) => (action: any) => {
    const result = next(action);
    if (typeof action.type == "string" && action.type.startsWith("products/")) {
      const state = store.getState();
      const quries: Record<string, any> = state.product.queries || {};
      const now = Date.now();
      const cleanedQueries: typeof quries = {};
      for (const [key, value] of Object.entries(quries)) {
        if (now - value?.lastFetched < STATE_TIME) {
          cleanedQueries[key] = value;
        }
      }

      if (
        Object.entries(quries).length !== Object.entries(cleanedQueries).length
      ) {
        store.dispatch({
          type: "products/cleanedQueries",
          payload: cleanedQueries,
        });
      }
    }

    return result;
  };
