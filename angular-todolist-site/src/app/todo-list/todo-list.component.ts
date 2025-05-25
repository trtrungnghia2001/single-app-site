import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface Todo {
  _id: string;
  task: string;
  compelete: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, MatIconModule],

  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todos: Todo[] = [];
  localStorageKey: string = 'todo-list';
  filter: string = '';
  input_text: string = '';

  isEdit: boolean = false;
  idEdit: string = '';

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    const getLocal = localStorage.getItem(this.localStorageKey);
    if (getLocal) {
      this.todos = JSON.parse(getLocal);
    } else {
      this.todos = [];
    }
  }
  saveTodos() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.todos));
  }
  addTask() {
    if (this.input_text.trim()) {
      const newTask: Todo = {
        _id: Date.now().toString(),
        task: this.input_text,
        compelete: false,
      };
      this.todos.unshift(newTask);
      this.input_text = '';
      this.saveTodos();
    }
  }
  editTask() {
    if (this.input_text.trim()) {
      console.log(this.input_text);

      this.todos = this.todos.map((item) =>
        item._id === this.idEdit ? { ...item, task: this.input_text } : item
      );
      this.isEdit = false;
      this.idEdit = '';
      this.input_text = '';
      this.saveTodos();
    }
  }
  setEdit(id: string, text: string) {
    this.isEdit = true;
    this.idEdit = id;
    this.input_text = text;
  }
  removeTask(id: string) {
    this.todos = this.todos.filter((item) => item._id !== id);
    this.saveTodos();
  }
  toggleCompelete(id: string) {
    this.todos = this.todos.map((item) =>
      item._id === id ? { ...item, compelete: !item.compelete } : item
    );
    this.saveTodos();
  }

  // filter
  getFilterTasks(): Todo[] {
    if (this.filter === 'done') {
      return this.todos.filter((item) => item.compelete);
    } else if (this.filter === 'todo') {
      return this.todos.filter((item) => !item.compelete);
    } else {
      return this.todos;
    }
  }
  setFilter(value: string) {
    this.filter = value;
  }
  // delete
  deleteDoneTask() {
    this.todos = this.todos.filter((item) => item.compelete === false);
    this.saveTodos();
  }
  deleteAllTask() {
    this.todos = [];
    this.saveTodos();
  }
}
