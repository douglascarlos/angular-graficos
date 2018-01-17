import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DadosService {

	readonly dados = [
		['Janeiro', 258],
		['Fevereiro', 564],
		['Março', 398],
		['Abril', 471],
		['Maio', 115],
		['Junho', 267],
	];

  constructor() { }

  public obterDados(): Observable<any> {
  	return new Observable(observable => {
  		observable.next(this.dados);
  		observable.complete();
  	});
  }

}
