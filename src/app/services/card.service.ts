import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  // apiUrl:string="https://fakestoreapi.com"

  // card: Card=new Card()
  cards:Card[]
  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private http:HttpClient) { }

  getCard():void{
    this.http.get<Card[]>(this.apiUrl+"/products")
    .subscribe({
      next: (res:Card[])=>{
        this.cards=res
      }
    })
  }

  addCard(card:Card):Observable<any>{
    return this.http.post<Card[]>(this.apiUrl +"/products", card)
  }

  updateCard(card:Card, cardId:number):Observable<any>{
    return this.http.put<Card[]>(this.apiUrl +"/products/" +cardId, card)
  }
}
