import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DadosService } from './dados.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	private dados: any;

  constructor(private dadosService: DadosService) { }

  ngOnInit() {
  	this.dadosService.obterDados().subscribe(
  		dados => {
  			this.dados = dados;
  			this.init();
  		}
  	);
  }

  private init(): void {
  	if(typeof(google) != undefined){
  		google.charts.load('current', {'packages':['corechart']});
  		setTimeout(() => {
  			google.charts.setOnLoadCallback(this.exibirGraficos());
  		}, 300);
  	}
  }

  private exibirGraficos(): void {
  	this.gerarPieChart();
  	this.gerar3dPieChart();
		this.gerarDonutChart();
		this.gerarBarChart();
		this.gerarLineChart();
		this.gerarColumnChart();
  }

  private gerarPieChart(): void {
  	let elementChart = document.getElementById('pie_chart');
  	let chart = new google.visualization.PieChart(elementChart);
    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  private gerar3dPieChart(): void {
  	let elementChart = document.getElementById('3d_pie_chart');
  	let chart = new google.visualization.PieChart(elementChart);
  	let opcoes = this.obterOpcoes();
  	opcoes['is3D'] = true;
    chart.draw(this.obterDataTable(), opcoes);
  }

  private gerarDonutChart(): void {
  	let elementChart = document.getElementById('donut_chart');
  	let chart = new google.visualization.PieChart(elementChart);
    let opcoes = this.obterOpcoes();
  	opcoes['pieHole'] = 0.4;
    chart.draw(this.obterDataTable(), opcoes);
  }

  private gerarBarChart(): void {
  	let elementChart = document.getElementById('bar_chart');
  	let chart = new google.visualization.BarChart(elementChart);
    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  private gerarLineChart(): void {
  	let elementChart = document.getElementById('line_chart');
  	let chart = new google.visualization.LineChart(elementChart);
    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  private gerarColumnChart(): void {
  	let elementChart = document.getElementById('column_chart');
  	let chart = new google.visualization.ColumnChart(elementChart);
    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  private obterDataTable(): any {
  	let data = new google.visualization.DataTable();
  	data.addColumn('string', 'Mës');
  	data.addColumn('number', 'Quantidade');
  	data.addRows(this.dados);
  	return data;
  }

  private obterOpcoes(): any {
  	return {
  		title: 'Quantidade de Cadastros Primeiro Semestre',
  		width: 400,
  		height: 300
  	};
  }

}
