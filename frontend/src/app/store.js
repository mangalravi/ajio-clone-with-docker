import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import cartReducer from '../features/cart/cartSlice.js';
import wishlistReducer from '../features/wishlist/wishlistSlice.js';

const PERSIST_KEY = 'ajio_state';

// Load the persisted slices from localStorage so cart/wishlist/user
// rehydrate instantly on page reload (the backend fetch then reconciles).
const loadState = () => {
  try {
    const serialized = localStorage.getItem(PERSIST_KEY);
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
};

// Persist only the user/cart/wishlist items, not transient flags like
// loading or error.
const saveState = (state) => {
  try {
    const toPersist = {
      auth: { user: state.auth.user, loading: false, error: null },
      cart: { items: state.cart.items, loading: false, error: null },
      wishlist: { items: state.wishlist.items, loading: false, error: null },
    };
    localStorage.setItem(PERSIST_KEY, JSON.stringify(toPersist));
  } catch {
    // Ignore write failures (e.g. storage full or disabled).
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: loadState(),
});

// Save the relevant slices to localStorage on every state change.
store.subscribe(() => {
  saveState(store.getState());
});
