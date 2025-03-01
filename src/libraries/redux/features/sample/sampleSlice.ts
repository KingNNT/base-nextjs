import { ISample } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  lists: ISample[];
}

const initialState: IState = {
  lists: [],
};

export const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    setLists(state, action: PayloadAction<ISample[]>) {
      state.lists = action.payload;
    },
    pushToLists(state, action: PayloadAction<ISample>) {
      const type = action.payload;
      if (type) {
        state.lists.push(action.payload);
      }
    },
    updateItemInList(state, action: PayloadAction<ISample>) {
      const type = action.payload;
      const index = state.lists.findIndex((item) => type.id === item.id);
      if (index) {
        state.lists[index] = type;
      }
    },
    deleteItemInList(state, action: PayloadAction<number>) {
      const id = action.payload;
      const f = state.lists.filter((item) => item.id !== id);
      state.lists = f;
    },
  },
});

export const { setLists, pushToLists, updateItemInList, deleteItemInList } =
  sampleSlice.actions;

export default sampleSlice.reducer;
