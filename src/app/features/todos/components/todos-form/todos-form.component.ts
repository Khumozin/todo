import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormType, FormValue, Todo } from '../../../../core';

const UI = [MatFormFieldModule, MatInputModule, MatButtonModule];

@Component({
  selector: 'todos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...UI],
  templateUrl: './todos-form.component.html',
  styleUrls: ['./todos-form.component.scss'],
})
export class TodosFormComponent {
  @Input() set todo(value: Todo | null) {
    if (value) {
      const controls = Object.keys(this.form.controls);
      controls.forEach((control) => {
        this.form.controls[control as keyof FormType].setValue(
          value[control as keyof FormType]
        );
      });
    } else {
      this.form.reset();
    }
  }

  @Output() onSave = new EventEmitter<Partial<FormValue>>();

  public form = new FormGroup<FormType>({
    Task: new FormControl(null, [Validators.required]),
  });

  onClick(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { value } = this.form;
    this.onSave.emit(value);
    this.form.reset();
  }
}
