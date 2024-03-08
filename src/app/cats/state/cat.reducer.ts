import { createReducer, on, State } from '@ngrx/store';
import { Cat } from '../Cat';

import { CatApiActions, CatPageActions } from './actions';

// State for this feature ( Cat )
export interface CatState {
  currentCatId: number | null;
  cats: Cat[];
  error: string;
}

const initialState: CatState = {
  currentCatId: null,
  cats: [],
  error: '',
};

export const catReducer = createReducer(
  initialState,
  on(
    CatPageActions.setCurrentCat,
    (state, action): CatState => {
      return {
        ...state,
        currentCatId: action.currentCatId,
      };
    }
  ),
  on(
    CatPageActions.clearCurrentCat,
    (state): CatState => {
      return {
        ...state,
        currentCatId: null,
      };
    }
  ),
  on(
    CatPageActions.initializeCurrentCat,
    (state): CatState => {
      return {
        ...state,
        currentCatId: 0,
      };
    }
  ),
  on(
    CatApiActions.LoadCatsSuccess,
    (state, action): CatState => {
      return {
        ...state,
        cats: action.cats,
        error: '',
      };
    }
  ),
  on(
    CatApiActions.loadCatsFailure,
    (state, action): CatState => {
      return {
        ...state,
        cats: [],
        error: action.error,
      };
    }
  ),
  on(
    CatApiActions.updateCatSuccess,
    (state, action): CatState => {
      const updatedCats = state.cats.map((item) =>
        action.cat.id === item.id ? action.cat : item
      );
      return {
        ...state,
        cats: updatedCats,
        currentCatId: action.cat.id,
        error: '',
      };
    }
  ),
  on(
    CatApiActions.updateCatFailure,
    (state, action): CatState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    CatApiActions.createCatsuccess,
    (state, action): CatState => {
      return {
        ...state,
        cats: [...state.cats, action.cat],
        currentCatId: action.cat.id,
        error: '',
      };
    }
  ),
  on(CatApiActions.createCatFailure, (state, action): CatState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a delete, the currentProduct is null.
  on(CatApiActions.deleteCatSuccess, (state, action): CatState => {
    return {
      ...state,
      cats: state.cats.filter(cat => cat.id !== action.catId),
      currentCatId: null,
      error: ''
    };
  }),
  on(CatApiActions.deleteCatFailure, (state, action): CatState => {
    return {
      ...state,
      error: action.error
    };
  })
);
