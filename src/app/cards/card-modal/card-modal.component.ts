import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements OnInit {

  cardForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private dialogRef: MatDialogRef<CardModalComponent>,
    private _snackBar: MatSnackBar,
    @Inject (MAT_DIALOG_DATA) public data:Card
  ) {
  }
  ngOnInit(): void {
    console.log(this.data);
    
    this.cardForm = this.fb.group({
      price: [this.data?.price||'', Validators.required],
      title: [this.data?.title||'', [Validators.required, Validators.maxLength(50)]],
      image: this.data?.image||"",
      description: this.data?.description||"",

    })
  }
  addCard():void {
    console.log(this.cardForm.value);
    this.cardService.addCard(this.cardForm.value)
      .subscribe({
        next: (res:any) => {
        console.log(res);
        this._snackBar.open(res||'Successfully added', "cancel",{
          duration:4000,
        });
        this.cardService.getCard();
        this.dialogRef.close();
      },
      error: err=>{
        console.log(err);
      }
      });
  }

  updateCard():void{
    console.log(this.cardForm.value);
    
    this.cardService.updateCard(this.cardForm.value, this.data.id)
    .subscribe({
      next: res=>{
        console.log(res); 
        console.log(this.cardForm.value);
        
        this._snackBar.open(res||'Sucessfully updated', "cancel",{
          duration:4000,
        });
        this.cardService.getCard();
        this.dialogRef.close();
      }
    })
  }
}
