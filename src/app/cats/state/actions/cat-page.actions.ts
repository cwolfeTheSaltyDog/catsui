import { Cat } from '../../Cat';

/* NgRx */
import { createAction, props } from '@ngrx/store';


export const setCurrentCat = createAction(
  '[Cat Page] Set Current Cat',
  props<{currentCatId: number}>()
);

export const clearCurrentCat = createAction(
  '[Cat Page] Clear Current Cat',
);

export const initializeCurrentCat = createAction(
  '[Cat Page] Initialize Current Cat',
);

export const loadCats = createAction(
  '[Cat Page] Load',
);

export const updateCat = createAction(
  '[Cat Page] Update Cat',
  props<{ cat: Cat }>()
);

export const createCat = createAction(
  '[Cat Page] Create Cat',
  props<{ cat: Cat }>()
);

export const deleteCat = createAction(
  '[Cat Page] Delete Cat',
  props<{ catId: number }>()
);


