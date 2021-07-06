import { postagem } from "./postagem"

export class tema
{
    public id: number
    public descricao: string
    public postagem: postagem [] //array de postagens dentro de tema
}