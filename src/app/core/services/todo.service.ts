import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  Firestore,
  Timestamp,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Todo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private taskCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.taskCollection = collection(this.firestore, 'Tasks');
  }

  getAll() {
    return collectionData(this.taskCollection, {
      idField: 'ID',
    }) as Observable<Todo[]>;
  }

  get(id: string) {
    const pokemonDocumentReference = doc(this.firestore, `Tasks/${id}`);
    return docData(pokemonDocumentReference, { idField: 'ID' });
  }

  create(task: Partial<Todo>) {
    task.Created = Timestamp.now();

    return addDoc(this.taskCollection, task);
  }

  update(task: Todo) {
    const pokemonDocumentReference = doc(this.firestore, `Tasks/${task.ID}`);
    return updateDoc(pokemonDocumentReference, { ...task });
  }

  delete(id: string) {
    const pokemonDocumentReference = doc(this.firestore, `Tasks/${id}`);
    return deleteDoc(pokemonDocumentReference);
  }
}
