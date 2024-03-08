import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Cat } from '../Cat';

@Component({
  selector: 'wsa-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatListComponent {
  pageTitle = 'Cats';

  @Input() errorMessage!: string;
  @Input() cats!: Cat[];
  @Input() selectedCat!: Cat;
  @Output() initializeNewCat = new EventEmitter<void>();
  @Output() catWasSelected = new EventEmitter<Cat>();

  newCat(): void {
    this.initializeNewCat.emit();
  }

  catSelected(cat: Cat): void {
    this.catWasSelected.emit(cat);
  }

}



