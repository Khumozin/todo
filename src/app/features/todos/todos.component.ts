import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { TodosFormComponent, TodosListComponent } from './components';
import { FormValue } from './models';
import { TodoService } from './services';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodosFormComponent, TodosListComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {

  private readonly todoService = inject(TodoService);

  onSave(value: Partial<FormValue>): void {
    this.todoService.add(value)
  }
}
