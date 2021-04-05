declare type SetStateWithCallback<State> = (nextState: State | ((currState: State) => State), callback?: (currState: State) => void) => void;
/** A hook that exposes a setState(state, callback) API similar to a component class. */
export default function useStateWithCallback<State>(initialState: State): [State, SetStateWithCallback<State>];
export {};
//# sourceMappingURL=useStateWithCallback.d.ts.map