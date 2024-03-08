import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from '../Cat';

/* NgRx */
import { Store } from '@ngrx/store';
import { getCats, getCurrentCat, getError, State } from '../state/';
import { CatPageActions } from '../state/actions';

@Component({
  templateUrl: './cat-shell.component.html',
})
export class CatShellComponent implements OnInit {
  selectedCat$!: Observable<Cat>;
  errorMessage$!: Observable<string>;
  cats$!: Observable<Cat[]>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    // Do NOT subscribe here because it uses an async pipe
    this.cats$ = this.store.select(getCats);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(CatPageActions.loadCats());

    // Do NOT subscribe here because it uses an async pipe
    this.selectedCat$ = this.store.select(getCurrentCat);

  }
  newCat(): void {
    this.store.dispatch(CatPageActions.initializeCurrentCat());
  }

  catSelected(cat: Cat): void {
    this.store.dispatch(CatPageActions.setCurrentCat({ currentCatId: cat.id }));
  }

  deleteCat(cat: Cat): void {
    this.store.dispatch(CatPageActions.deleteCat({ catId: cat.id }));
  }

  clearCat(): void {
    this.store.dispatch(CatPageActions.clearCurrentCat());
  }
  saveCat(cat: Cat): void {
    this.store.dispatch(CatPageActions.createCat({ cat }));
  }

  updateCat(cat: Cat): void {
    this.store.dispatch(CatPageActions.updateCat({ cat }));
  }

}
