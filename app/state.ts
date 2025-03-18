import { useSyncExternalStore } from "react";

/** 
  Create a store with the initial state.
  @param initialState - The initial state of the store.
  @returns An object with methods to get, set, update, reset the state and a hook to use the store.
*/
export const createState = <StateType>(initialState: StateType) => {
  let currentState = initialState;
  const listeners = new Set<(state: StateType) => void>();

  /**
   * get()
   * -----
   * Returns the current state value.
   *
   * This method is the primary way to retrieve the latest state stored in the store.
   * It acts as the "source of truth" for the state managed by the store and is used
   * internally by the custom hook (that wraps React's useSyncExternalStore) and can be
   * used in custom selectors or synchronous read scenarios.
   *
   * @returns The current state.
   */
  const get = () => currentState;

  /**
   * set()
   * -----
   * Updates the state with the provided new state and notifies all subscribers.
   *
   * @param newState - The new state to be set.
   */
  const set = (newState: StateType) => {
    currentState = newState;
    listeners.forEach((listener) => listener(currentState));
  };

  /**
   * update()
   * --------
   * Updates the state by applying a function to the current state.
   *
   * @param fn - A function that receives the previous state and returns a new state.
   */
  const update = (fn: (prev: StateType) => StateType) => {
    set(fn(currentState));
  };

  /**
   * reset()
   * -------
   * Resets the state back to the initial state.
   */
  const reset = () => set(initialState);

  /**
   * subscribe()
   * -----------
   * Subscribes a listener function to state changes.
   *
   * @param listener - A function that is called whenever the state changes.
   * @returns An unsubscribe function to remove the listener.
   */
  const subscribe = (listener: (state: StateType) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  /**
   * use()
   * -----
   * A custom hook to subscribe to the store and select a slice of the state.
   * It uses React's useSyncExternalStore to ensure the component updates when
   * the selected state changes.
   *
   * For server-side rendering fallback, it returns the initial state's selected slice.
   *
   * @param selector - A function that derives the desired portion of the state.
   * @returns The selected slice of the state.
   */
  const use = <SelectorOutput>(selector: (state: StateType) => SelectorOutput): SelectorOutput =>
    useSyncExternalStore(
      subscribe,
      () => selector(currentState),
      () => selector(initialState) // fallback for server snapshot; using initialState
    );

  return {
    get,
    set,
    update,
    reset,
    subscribe,
    use,
  };
};
