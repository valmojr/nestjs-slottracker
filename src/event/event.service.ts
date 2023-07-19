import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { randomUUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: Event): Promise<Event> {
    data.id = randomUUID();

    return this.databaseService.event.create({
      data, // se eu colocar somente data, como a propriedade data é igual ao atributo data, eu naõ preciso colocar "data: data", ele já entende que "data" ta chamando a propriedade e o valor
    });
  }

  findAll(): Promise<Event[]> {
    return this.databaseService.event.findMany();
  }

  findById(id: string) {
    return this.databaseService.event.findMany({
      where: {
        id, // where id:id (o id que eu quero achar tem que ser igual ao id do parâmetro da função)
      },
    });
  }

  update(data: Event) {
    return this.databaseService.event.update({
      where: {
        id: data.id, // o nest gera essa função com 2 parâmetros, o id e a data, eu sempre removo o ID porquê ele se eu estou atualizando uma entidade, naõ vejo situação em que eu vá precisar atualizar o id dela
      },
      data,
    });
  }

  remove({ id }: Event) { // se eu chamo um objeto (note que eu coloquei o tipo como Event), e coloco somente uma propriedade de ele entre conchetes, ele vai chamar somente aquela propriedade, no caso o id, mas vai obrigar que tu passe um objeto do tipo desejado
    return this.databaseService.event.delete({
      where: { id },
    });
  }
}
