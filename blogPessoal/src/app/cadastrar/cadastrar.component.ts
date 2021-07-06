import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: usuario = new usuario
  confirmarSenha: string
  tipoUsuario: string

  //injeção de dependencias
  constructor
  (
    private authService: AuthService,
    private router: Router
  ) 
  { }

  ngOnInit() 
  {
    window.scroll(0,0)
  }

  confirmeSenha(event: any)
  {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any)
  {
    this.tipoUsuario = event.target.value
  }

  cadastrar()
  {
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha)
    {
      alert('As senhas estão divergentes.')
    }
    else
    {
      this.authService.cadastrar(this.usuario).subscribe((resposta:usuario) => {
          this.usuario = resposta
          this.router.navigate(['/inicio'])
          alert ('usuário cadastrado com sucesso!')
        })
    }
  }
}
