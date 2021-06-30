import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { userlogin } from '../model/userLogin';
import { usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //validar se existe no app.modules.ts
  constructor
  (
    private http: HttpClient
  ) { }

                                // garante que o parametro recebido é do tipo user login (neste caso)
  entrar(userlogin: userlogin): Observable<userlogin>
  {
    return this.http.post<userlogin> ('http://localhost:8080/usuarios/logar', userlogin)
  }

  cadastrar (usuario: usuario): Observable<usuario>
  {
    return this.http.post<usuario> ('http://localhost:8080/usuarios/cadastrar', usuario)
  }

  //metodo para mostar navbar e rodape
  logado()
  {
    let ok: boolean = false

    if(environment.token != '')
    {
      ok = true
    }

    return ok
  }
}
