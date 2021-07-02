import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';
import { tema } from '../model/tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: tema = new tema()
  listaTemas: tema[]

  constructor
  (
    private router: Router,
    private temaService : TemaService
  ) { }

  ngOnInit() 
  {
    if (environment.token == '')
    {
      //alert('Sua sessão expirou. Faça login novamente')
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas()
  }

  findAllTemas()
  {
    this.temaService.getAllTema().subscribe((resposta: tema[])=>
    {
      this.listaTemas=resposta
    })
  }

  cadastrar()
  {
    this.temaService.postTema(this.tema).subscribe((resposta: tema)=>
    {
      this.tema = resposta
      alert('Tema cadastrado com sucesso')
      this.findAllTemas()
      this.tema=new tema()
    })
  }

}
