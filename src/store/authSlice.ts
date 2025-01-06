/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state interface
interface UserData {
  name?: string;
  email?: string;
  photo?: string;
}

// Create a slice with reducers for updating the state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('userData'), // Check if user is logged in (based on localStorage)
    userData: JSON.parse(localStorage.getItem('userData') || '{}'), // Load userData from localStorage if available
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setUserData(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload)); // Save user data to localStorage
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = {};
      localStorage.removeItem('userData'); // Remove user data from localStorage on logout
    },
  },
});

// Export the actions for later use in components
export const { setIsLoggedIn, setUserData, logout } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
