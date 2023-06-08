import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';

import { Todo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly firestore: Firestore) {}

  async getOne(id: string) {
    const docSnap = await getDoc(doc(this.firestore, 'Tasks', id));
    return { ...docSnap.data(), ID: id } as Todo;
  }

  async getAll() {
    const docs = await getDocs(collection(this.firestore, 'Tasks'));
    let items: any[] = [];

    docs.forEach((d) => {
      items.push({ ID: d.id, ...d.data() });
    });

    return items as Todo[];
  }

  async add(todo: Partial<Todo>) {
    return await addDoc(collection(this.firestore, 'Tasks'), todo);
  }

  async update(todo: Partial<Todo>) {
    return await updateDoc(doc(this.firestore, 'Tasks', todo.ID!), {
      Task: todo.Task,
    });
  }

  async delete(id: string) {
    await deleteDoc(doc(this.firestore, 'Tasks', id));
  }
}
