import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from '../../shared/generic-validator';
import { Cat } from '../Cat';

@Component({
  selector: 'wsa-cat-edit',
  templateUrl: './cat-edit.component.html',
  styleUrls: ['./cat-edit.component.css'],
})
export class CatEditComponent implements OnInit, OnChanges {
  pageTitle = 'Cat Edit';
  @Input() errorMessage: string;
  @Input() selectedCat: Cat;
  @Output() create = new EventEmitter<Cat>();
  @Output() update = new EventEmitter<Cat>();
  @Output() delete = new EventEmitter<Cat>();
  @Output() clearCurrent = new EventEmitter<void>();

  catForm: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      catName: {
        required: 'Cat name is required.',
        minlength: 'Cat name must be at least three characters.',
        maxlength: 'Cat name cannot exceed 50 characters.',
      },
      coatColor: {
        required: 'Coat Color is required.',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit(): void {
    // Define the form group
    this.catForm = this.fb.group({
      catName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      coatColor: ['', Validators.required],
    });

    // Watch for value changes for validation
    this.catForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.catForm)
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedCat) {
      const cat = changes.selectedCat.currentValue as Cat;
      this.displayCat(cat);
    }
  }

  displayCat(cat: Cat | null): void {
    if (cat && this.catForm) {
      // Reset the form back to pristine
      this.catForm.reset();

      // Display the appropriate page title
      if (cat.id === 0) {
        this.pageTitle = 'Add Cat';
      } else {
        this.pageTitle = `Edit Cat: ${cat.catName}`;
      }

      // Update the data on the form
      this.catForm.patchValue({
        catName: cat.catName,
        coatColor: cat.coatColor,
      });
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.catForm);
  }
  cancelEdit(): void {
    // Redisplay the currently selected product
    // replacing any edits made
    this.displayCat(this.selectedCat);
  }

  deleteCat(): void {
    if (this.selectedCat && this.selectedCat.id) {
      if (confirm(`Really delete the product: ${this.selectedCat.catName}?`)) {
        this.delete.emit(this.selectedCat);
      }
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  saveCat(): void {
    if (this.catForm.valid) {
      if (this.catForm.dirty) {
        // Copy over all of the original cat properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const cat = { ...this.selectedCat, ...this.catForm.value };

        if (cat.id === 0) {
          this.create.emit(cat);
        } else {
          this.update.emit(cat);
        }
      }
    }
  }
}
