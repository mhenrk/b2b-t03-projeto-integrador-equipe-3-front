import { Component, EventEmitter, Input, Output, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiTodoListService } from 'src/app/services/api-todo-list.service';
import { AxiosInstance } from 'axios';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
    
export class ModalUserComponent {
axiosInstance: AxiosInstance;
  showAlert: boolean = false;
  message: string = '';
  error: boolean = true;
 
  @Input() user: User = {
    userId: 0,
    name: '',
    email: '',
    password: ''
  }
  @Output() loadUser: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private apiTodoListService: ApiTodoListService) {
    this.axiosInstance = apiTodoListService.getAxiosInstance();
    this.user= {
       userId: 0,
        name: '',
        email: '',
        password: ''
    }
  }

  async onSubmit() {
    try {
      console.log(this.user);
      const response = await this.axiosInstance.put('/users/', this.user);
          this.showAlert = true;
          this.message = 'Usuário Atualizado com sucesso!';
          this.error = false;
        window.location.href = '/perfil';    
    } catch (error: any) {
      console.log('Erro ao atualizar a Tarefa', error);
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
    window.location.href = '/perfil';
  }
}
