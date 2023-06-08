import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { TodosFormComponent, TodosListComponent } from './components';
import { FormValue, Todo } from './models';
import { TodoService } from './services';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodosFormComponent, TodosListComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  private readonly todoService = inject(TodoService);

  public todos: Todo[] = [];

  ngOnInit(): void {
    this.todoService.getAll().then((items) => {
      this.todos = items;
    });
  }

  onSave(value: Partial<FormValue>): void {
    this.todoService.add(value).then((response) => {
      const item: Todo = {
        ID: response.id,
        Task: value.Task!,
      };

      this.todos.push(item);
    });
  }
}
