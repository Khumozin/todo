import { Injectable } from '@angular/core';

import { Todo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  get() {}

  getAll() {}

  add(todo: Partial<Todo>) {}

  update() {}

  delete() {}
}
