import { from } from 'rxjs';
import { Cat } from '../../Cat';

import { createAction, props} from '@ngrx/store';

export const LoadCatsSuccess = createAction(
  '[Cat API Success]',
  props<{ cats: Cat[]}>()
);

export const loadCatsFailure = createAction(
  '[Cat API] Load Fail',
  props<{ error: string }>()
);

export const updateCatSuccess = createAction(
  '[Cat API] Update Cat Success',
  props<{ cat: Cat }>()
);

export const updateCatFailure = createAction(
  '[Cat API] Update Cat Fail',
  props<{ error: string }>()
);

export const createCatsuccess = createAction(
  '[Cat API] Create Cat Success',
  props<{ cat: Cat }>()
);

export const createCatFailure = createAction(
  '[Cat API] Create Cat Fail',
  props<{ error: string }>()
);

export const deleteCatSuccess = createAction(
  '[Cat API] Delete Cat Success',
  props<{ catId: number }>()
);

export const deleteCatFailure = createAction(
  '[Cat API] Delete Cat Fail',
  props<{ error: string }>()
);
