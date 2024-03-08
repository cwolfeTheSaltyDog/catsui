import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { CatState } from './cat.reducer';


export interface State extends AppState.State {
  cats: CatState;
}
// Selector functions
const getCatFeatureState = createFeatureSelector<CatState>('cats');

export const getCats = createSelector(
  getCatFeatureState,
  state => state.cats
);

export const getCurrentCatId = createSelector(
  getCatFeatureState,
  state => state.currentCatId
);

export const getCurrentCat = createSelector(
  getCatFeatureState,
  getCurrentCatId,
  (state, currentCatId) => {
    if (currentCatId === 0){
      return {
        id: 0,
        catName: '',
        coatColor: '',
      };
    } else {
      return currentCatId ? state.cats.find(c => c.id === currentCatId) : null;
    }
  }
);

export const getError = createSelector(
  getCatFeatureState,
  state => state.error
);
