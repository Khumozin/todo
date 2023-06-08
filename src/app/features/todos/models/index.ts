import { FormControl } from '@angular/forms';

export type FormType = {
  Task: FormControl<string | null>;
};

export type FormValue = {
  Task: string | null;
};

export type Todo = {
  ID: string | null;
  Task: string | null;
}