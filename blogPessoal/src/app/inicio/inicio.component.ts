import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';
import { tema } from '../model/tema';
import { usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: postagem = new postagem()
  listaPostagens: postagem[]

  tema: tema = new tema()
  listaTemas: tema[]
  idTema: number

  user: usuario = new usuario()
  idUser = environment.id

  constructor
  (
    private router: Router,
    private postagemService: PostagemService,

    private temaService: TemaService,

    private authService: AuthService
  ) { }

  //toda vez que a aplicação iniciar tem que passar por aq
  ngOnInit() 
  {
    if (environment.token == '')
    {
      //alert('Sua sessão expirou. Faça login novamente')
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()

    this.getAllPostagens()

    this.postagemService.refreshToken()

    this.temaService.refreshToken()

  }

  getAllTemas()
  {
    this.temaService.getAllTema().subscribe((resposta:tema[])=>
    {
      this.listaTemas = resposta
    })
  }

  findByIdTema()
  {
    this.temaService.getByIdTema(this.idTema).subscribe((resposta: tema)=>
    {
      this.tema = resposta
    })
  }

  getAllPostagens()
  {
    this.postagemService.getAllPostagens().subscribe((resposta: postagem[])=>
    {
      this.listaPostagens = resposta
    })
  }

  findByIdUser()
  {
    this.postagemService.getByIdUser(this.idUser).subscribe((resposta: usuario)=>
    {
      this.user = resposta
    })
  }

  publicar()
  {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resposta: postagem)=>
    {
      this.postagem = resposta
      alert('Postagem realizada com sucesso!')
      this.postagem = new postagem()
      this.getAllPostagens()
    })
  }

}
