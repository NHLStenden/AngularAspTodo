import { Component, OnInit } from '@angular/core';
import {Todo} from "../Models/todo";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public todos: Todo[];

  public newTodo: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.newTodo = new Todo();

    this.todoService.get().subscribe(todos => {
      this.todos = todos;
    });
  }

  delete(todoId: number) {
    this.todoService.delete(todoId).subscribe(x => {
      this.todos = this.todos.filter(x => x.id != todoId);
    });
  }

  add() {
    this.todoService.create(this.newTodo).subscribe(x => {
      this.todos.push(x);
      this.newTodo = new Todo();
    });
  }
}
