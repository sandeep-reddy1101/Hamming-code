import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Hamming {
  value: Array<number>;
  viewValue: string;
}

@Component({
  selector: 'app-decode',
  templateUrl: './decode.component.html',
  styleUrls: ['./decode.component.css']
})
export class DecodeComponent implements OnInit {

  // Values we will present in drop down
  hamming: Hamming[] = [
    {value: [7,4], viewValue: '(7,4)'},
    {value: [8,4], viewValue: '(8,4)'},
    {value: [15,11], viewValue: '(15,11)'},
    {value: [16,11], viewValue: '(16,11)'}
  ];

  selectedHamming = this.hamming[0].value

  message:any = new FormControl('');
  checkBit:boolean = false

  constructor() { }

  ngOnInit(): void {
    
  }

  abc(){
    console.log(this.message.value)
    console.log(this.selectedHamming)
  }

}
