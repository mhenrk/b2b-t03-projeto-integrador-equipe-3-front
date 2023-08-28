import { Component, EventEmitter, Input, Output, OnInit, Inject } from '@angular/core';
import { Task, TaskCreate } from 'src/app/interfaces/task';
import { Router } from '@angular/router';
import { ApiTodoListService } from 'src/app/services/api-todo-list.service';
import { AxiosInstance } from 'axios';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css']
})
export class ModalTaskComponent {
  axiosInstance: AxiosInstance;
  showAlert: boolean = false;
  message: string = '';
  error: boolean = true;

  @Input() task: Task = {
    userId: 0,
    title: '',
    description: '',
    status: '',
    taskId: 0
  }
  @Output() loadTaks: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private apiTodoListService: ApiTodoListService) {
    this.axiosInstance = apiTodoListService.getAxiosInstance();
  }

  async onSubmit() {
    try {
      console.log(this.task);

      if (this.task.taskId === 0) {
        const response = await this.axiosInstance.post('/tasks', this.task);
        if (response.status === 200) {
          this.showAlert = true;
          this.message = 'Tarefa cadastrada com sucesso!';
          this.error = false;
          this.loadTaks.emit();
          this.task = {
            title: '',
            description: '',
            status: 'Selecione um status',
            taskId: 0,
            userId: 0
          }
        }
      } else {
        const response = await this.axiosInstance.put(`/tasks/${this.task.taskId}`, this.task);
        window.location.href = '/board';
      }

    } catch(error: any) {
      this.message = error.response.data;
      this.showAlert = true;
      this.error = true;
    }

    setTimeout(() => {
      this.showAlert = false;
      this.message = '';
    }, 10000)
  }

  onClose() {
    window.location.href = '/board';
  }
}
