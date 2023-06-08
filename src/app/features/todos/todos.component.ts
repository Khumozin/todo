import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

import { FormValue, Todo } from '../../core';
import { TodoService } from '../../core/services';
import { TodosFormComponent, TodosListComponent } from './components';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodosFormComponent, TodosListComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  private readonly todoService = inject(TodoService);

  public readonly todos$ = this.todoService
    .getAll()
    .pipe(
      map((todos) =>
        todos.sort((a, b) => b.Created?.seconds - a.Created?.seconds)
      )
    );

  public selectedTodo: Todo | null = null;

  onSave(value: Partial<FormValue>): void {
    if (this.selectedTodo) {
      this.selectedTodo.Task = value.Task!;
      this.todoService
        .update(this.selectedTodo)
        .then(() => (this.selectedTodo = null));
    } else {
      this.todoService.create(value).then(() => {
        this.selectedTodo = null;
      });
    }
  }

  onSelect(item: Todo): void {
    this.selectedTodo = item;
  }
}
