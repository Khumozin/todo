import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { Todo } from '../../models';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent {
  @Input() todos : Todo[] = []
}
