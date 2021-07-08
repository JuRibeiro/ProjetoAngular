import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';
import { usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  usuario: usuario = new usuario()

  constructor(
    private http: HttpClient
  ) { }


  token = 
  {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken()
  {
    this.token={
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getAllPostagens(): Observable<postagem[]>
  {
    return this.http.get<postagem[]>('http://localhost:8080/postagem', this.token)
  }

  postPostagem(postagem: postagem): Observable<postagem>
  {
    return this.http.post<postagem>('http://localhost:8080/postagem', postagem,this.token)
  }

  getByIdUser(id: number) : Observable<usuario>
  {
    return this.http.get<usuario>(`http://localhost:8080/usuarios/${id}`, this.token)
  }
}
