import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {CatShellComponent} from './cat-shell/cat-shell.component';
import { CatListComponent } from './cat-list/cat-list.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { catReducer } from './state/cat.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CatEffects } from './state/cat.effects';
import { CatEditComponent } from './cat-edit/cat-edit.component';


const catRoutes: Routes = [
  { path: '', component: CatShellComponent },
];

@NgModule({
  declarations: [
    CatShellComponent,
    CatListComponent,
    CatEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(catRoutes),
    StoreModule.forFeature('cats', catReducer),
    EffectsModule.forFeature([CatEffects])
  ]
})
export class CatsModule { }
