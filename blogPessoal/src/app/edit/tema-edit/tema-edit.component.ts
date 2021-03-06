import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tema } from 'src/app/model/tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: tema = new tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    //rota ativa
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token=='')
    {
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
  }

  findByIdTema(id: number)
  {
    this.temaService.getByIdTema(id).subscribe((resposta: tema)=>
    {
      this.tema=resposta
    })
  }

  atualizar()
  {
    this.temaService.putTema(this.tema).subscribe((resposta: tema)=>
    {
      this.tema = resposta
      alert('Tema atualizado!')
      this.router.navigate(['/tema'])
    })
  }

}
