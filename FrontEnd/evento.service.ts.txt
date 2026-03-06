// Importa o decorator Injectable para permitir injeção de dependência
import { Injectable } from '@angular/core';

// Importa o HttpClient que permite fazer requisições HTTP
import { HttpClient } from '@angular/common/http';

// Importa Observable da biblioteca RxJS
// Angular usa Observable para lidar com respostas assíncronas
import { Observable } from 'rxjs';

// Decorator que indica que esse service pode ser usado em toda aplicação
@Injectable({
  providedIn: 'root'
})

// Classe do serviço responsável por chamadas de API
export class EventoService {

  // URL da API que será chamada
  private apiUrl = 'https://sua-api.com/esperar-criacao-api';

  // Construtor recebe o HttpClient por injeção de dependência
  constructor(private http: HttpClient) {}

  // Método que faz a chamada POST para a API
  esperarCriacaoApi(dados: any): Observable<any> {

    // Faz requisição POST enviando os dados para a API
    return this.http.post(this.apiUrl, dados);

  }

}
