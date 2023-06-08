import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { Todo } from '../../../../core';



@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent {
  @Input() todos : Todo[] | null = []
  @Output() onSelect = new EventEmitter<Todo>()
}
