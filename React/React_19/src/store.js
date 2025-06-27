import { create } from "zustand";

const defaultObj = {
  field1: "hi",
  field2: "hello",
};

export const useCounterStore = create((set) => ({
  counter: 0,
  object: defaultObj,
  incrementCounter: () =>
    set((state) => ({
      counter: state.counter + 1,
    })),
  decrementCounter: () =>
    set((state) => ({
      counter: state.counter - 1,
    })),
  manipulateObj: (obj) => set(obj),
}));
