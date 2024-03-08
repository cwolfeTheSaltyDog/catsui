import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import {  of } from 'rxjs';
import { CatService } from '../cat.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CatApiActions, CatPageActions } from './actions';


@Injectable()
export class CatEffects {
  constructor(private actions$: Actions, private catService: CatService) {}

  loadCats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatPageActions.loadCats),
      mergeMap(() =>
        this.catService.getCats().pipe(
          map((cats) => CatApiActions.LoadCatsSuccess({ cats })),
          catchError((error) => of(CatApiActions.loadCatsFailure({ error })))
        )
      )
    );
  });

  createCat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatPageActions.createCat),
      concatMap((action) =>
        this.catService.createCat(action.cat).pipe(
          map((cat) => CatApiActions.createCatsuccess({ cat })),
          catchError((error) => of(CatApiActions.createCatFailure({ error })))
        )
      )
    );
  });

  updateCat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatPageActions.updateCat),
      concatMap((action) =>
        this.catService.updateCat(action.cat).pipe(
          map((cat) => CatApiActions.updateCatSuccess({ cat })),
          catchError((error) => of(CatApiActions.updateCatFailure({ error })))
        )
      )
    );
  });

  deleteCat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatPageActions.deleteCat),
      mergeMap((action) =>
        this.catService.deleteCat(action.catId).pipe(
          map(() => CatApiActions.deleteCatSuccess({ catId: action.catId })),
          catchError((error) => of(CatApiActions.deleteCatFailure({ error })))
        )
      )
    );
  });
}
