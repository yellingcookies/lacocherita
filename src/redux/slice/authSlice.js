import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userID: null,
    UserRol: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            const {email, userName, userID, userRol} = action.payload;
            state.isLoggedIn = true;
            state.email = email;
            state.userName = userName;
            state.userID = userID;
            state.userRol = userRol;

        },
        REMOVE_ACTIVE_USER(state, action){
            state.isLoggedIn = false;
            state.email = null;
            state.userName = null;
            state.userID = null;
            state.userRol = null;
            //console.log(state.isLoggedIn);
        }
    }
});

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SET_ROL} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;
export const selectRol = (state) => state.auth.userRol;

export default authSlice.reducer;