import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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
         return {...state,
         isLoggedIn : true,
         loginTime : new Date().toLocaleTimeString(),
         accessToken : user.accessToken,
         tokenType : user.tokenType,
         id : user.id,
         username : user.username,
         roles : user.roles,
         mediaLists : user.mediaLists
         }
      },
      logout: () => {
         window.localStorage.removeItem('user');
         return initialState;
      },
      setMediaLists: (state, action) => {
         return {...state, mediaLists: [...action.payload.slice().sort((cML, pML) => cML.name.localeCompare(pML.name))]};
      }
   }
});


export default userSlice.reducer;

export const { loginSuccess, logout, setMediaLists } = userSlice.actions;

// export const resetMediaLists = createAsyncThunk('posts/addPost', async(accessToken) => {
//    const response = await fetch('http://localhost:8090/api/medialist/lists', {
//             method: 'GET',
//             headers: new Headers({Authorization: `Bearer ${accessToken}`, Accept: 'application/json'})
//          }
//     );
//    let data = await response.json();
//    console.log(data);
//    return data;
// });












