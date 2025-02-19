import { createSlice } from "@reduxjs/toolkit";


const Search = createSlice({
  name: "search",
  initialState: {
    Searchdata: []
  },

  reducers: {
    searchUser: (state, action) => {
      state.Searchdata = action.payload
      // console.log(action.payload)
    }
  },

})

export default Search.reducer;
export const {searchUser} = Search.actions