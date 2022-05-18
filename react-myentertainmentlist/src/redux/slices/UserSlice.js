import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import MedialistService from "../../components/backend/medialist.service";

const initialState = {
   isLoggedIn: false,
   accessToken: "",
   tokenType: "",
   id: null,
   username: "",
   roles: [],
   mediaLists: [],
   loginTime: ""
}

export const userSlice = createSlice({
   name: 'user',
   initialState: initialState,
   reducers: {
      loginSuccess: (state, action) => {
         const user = action.payload;
         state.isLoggedIn = true;
         state.loginTime = new Date().toLocaleTimeString();
         state.accessToken = user.accessToken;
         state.tokenType = user.tokenType;
         state.id = user.id;
         state.username = user.username;
         state.roles = user.roles;
         state.mediaLists = user.mediaLists;
      },
      logout: () => {
         Cookies.remove('user');
         return initialState;
      },
      setMediaLists: (state, action) => {
         state.mediaLists = action.payload;
      },
   }
});


export default userSlice.reducer;

export const { loginSuccess, logout, setMediaLists } = userSlice.actions;