import { Component } from '@angular/core';
import { evaluate } from 'mathjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public calculo = ''; //indica vazia
  public resultado: string; //nulo

 private ponto = false; 
private operacoes = ['+', '-', '*', '/'];

  constructor(public alertController: AlertController) {}

  //metodo para incluir o numero ao clicar nele
  adicionarNumero(valor:string){
    if(this.resultado){
      this.apagarTudo(); //limpar a calculadora antes de colocar o proximo valor
    }

    this.calculo = this.calculo + valor;
  }

  adicionarPonto(){

    if(this.ponto){
      return;  //ao clicar no botao de ponto ele retorna vazio(nao executa nenhuma ação)
    }

    this.calculo += ".";
    this.ponto = true;
  }

  //metodo que faz o acionamento das operações na calculadora
  adicionarOperacao(operador:string){

    if(this.resultado) {
      this.calculo = this.resultado.toString();
      this.resultado = null;
    }

    const ultimo = this.calculo.slice(-1); //pegando o ultimo item para nao repetir o operador

    if(this.operacoes.indexOf(ultimo) > -1) {
      return;
    } //indexOf ele procura dentro da variavel o que vem por parametro no caso as operacoes se ele nao encontrar ele retorna -1

    this.calculo += operador;
    this.ponto = false;
  }

  //metodo que faz apagar tudo o que escrevi na calculadora
  apagarTudo(){
this.calculo = '';
this.resultado = null;
this.ponto = false; 
  }

 //ao apertar dell ele apaga o ultimo caracter
  apagarUltimo(){
    const ultimo = this.calculo.slice(-1); // quem é o ultimo caracter
    if(ultimo == '.'){
      this.ponto = false;

    }
    
    this.calculo = this.calculo.slice(0, -1); //slice ele apaga o ultimo numero que desejo(até o ultimo caracter) 
  }

  calcularResultado(){
    try{ 
      this.resultado = evaluate(this.calculo); //toda vez que clilcar no botao de '=' ele ira executar
    } catch (e) {
      this.resultado = ''; // '' significa zerado
      this.presentAlert('ERRO!!!', 'CÁLCULO INVALIDO, VERIFIQUE!');
    }
    
  }

   async presentAlert(titulo:string, mensagem:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['ok']

    });
    await alert.present();
  }
}
