import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Href } from "expo-router";

interface MenuState {
  isMenuOpen: boolean;
  menuLinks: Href;
  notification: boolean;
  isFromDrawer: boolean;
}

const initialState: MenuState = {
  isMenuOpen: false,
  menuLinks: "/",
  notification: true,
  isFromDrawer: false,
};

const menuState = createSlice({
  name: "menuState",
  initialState,
  reducers: {
    setNewMenu(state, action: PayloadAction<MenuState>) {
      state.isMenuOpen = action.payload.isMenuOpen;
      state.menuLinks = action.payload.menuLinks;
    },
    setMenuLink(state, action: PayloadAction<Href>) {
      state.menuLinks = action.payload;
    },
    setMenuDrawer(state, action: PayloadAction<boolean>) {
      state.isFromDrawer = action.payload;
    },
    setNotification(state, action: PayloadAction<boolean>) {
      state.notification = action.payload;
    },
  },
});

export const { setNewMenu, setMenuLink, setNotification, setMenuDrawer } =
  menuState.actions;
export default menuState.reducer;
