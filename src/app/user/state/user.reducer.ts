

/* NgRx */
import { createReducer, on, createFeatureSelector, createSelector, createAction } from '@ngrx/store';
import { User } from '../user';

// State for this feature (User)
export interface UserState {
  isLoggedOn: boolean;
  currentUser: User | null;
}

const initialState: UserState = {
  isLoggedOn: false,
  currentUser: null
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getIsUserLoggedOn = createSelector(
  getUserFeatureState,
  state => state.isLoggedOn
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export const userReducer = createReducer(
  initialState,
  on(createAction('[User] Toggle Is Logged On'), state => {
    return {
      ...state,
      showIsLoggedOn: !state.isLoggedOn
    };
  })
);
