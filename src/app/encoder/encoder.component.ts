import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Hamming {
  value: Array<number>;
  viewValue: string;
}


@Component({
  selector: 'app-encoder',
  templateUrl: './encoder.component.html',
  styleUrls: ['./encoder.component.css']
})
export class EncoderComponent implements OnInit {

  // Values we will present in drop down
  hamming: Hamming[] = [
    {value: [7,4], viewValue: '(7,4)'},
    {value: [8,4], viewValue: '(8,4)'},
    {value: [15,11], viewValue: '(15,11)'},
    {value: [16,11], viewValue: '(16,11)'}
  ];

  selectedHamming = this.hamming[0].value

  message:any = new FormControl('');

  parityArr:Array<any> = []
  finalArr:any = []
  toDisplay:any = []
  hammingCode:number[] = []
  checkBit:boolean = false
  hammingCodeWithCheckBit:any = []
  parityValues: {[k: string]: any} = {}

  constructor() { }

  ngOnInit(): void {
  }

  check(){
    // if(this.selectedHamming[0]%2 == 0){
    //   this.selectedHamming[0] -= 1
    //   this.checkBit = true
    // }else{
    //   this.checkBit = false
    // }
    let num = 1
    let count = 0
    let len = this.selectedHamming[0]
    while(num < len){
      count += 1
      num *= 2
    }
    let diff = this.selectedHamming[0] - this.selectedHamming[1]
    if(count == diff){
      this.checkBit = false
    }else{
      this.selectedHamming[0] -= 1
      this.checkBit = true
    }
  }
  
  // This function will get triggered when user click submit button after entering input message
  abc(){
    this.hammingCodeWithCheckBit = []
    // This will call a function to check whether there will be a check bit in the hamming code or not
    this.check()
    this.toDisplay = []
    this.finalArr = []
    // This array will store message with parity bits eg: [p1,p2,1,p4,0,1,1]
    let arr = []
    // Reversing the input message because we are going with right to left
    let reverseMessage = this.message.value.split("").reverse()

    // The below code will push message data into new array along with parity bits.. 
    //output will be something like [p1,p2,1,p4,0,1,1]
    //Output will be pushed to variable arr
    let n=1
    for(let i=0;i<this.selectedHamming[0]; i++){
      if(i+1 === n){
        let str1 = "P" + n.toString()
        arr.push(str1)
        n = n*2
      }
      else{
        arr.push(reverseMessage.pop())
      }
    }

    this.parityArr = arr
    this.toDisplay.push(arr)

    // The variable list1 will store the parity bits indexs 
    //i.e., p1 index is 1, p2 index is 2, p4 index is 4 etc
    let list1 = []
    for(let j=0;j<arr.length;j++){
      if(arr[j].charAt(0) === 'P'){
        list1.push(j+1)
      }
    }

    // Iterating over list1 and calling selectParityBits function for each value in list1 array.
    // The output of selectParityBits will be stored in finalArr
    list1.forEach((num)=>{this.selectParityBits(num)})

    // The bellow called function will calculate the parity of p1, p2, p4 etc...
    // The output of calculateParity is something like {p1:0, p2:1, p4:1} which is a object
    let finalParity = this.calculateParity(this.finalArr)

    //Copying parityArr to hamminCode
    this.hammingCode = [...this.parityArr]

    // The below code will iterate over the object which has parity values
    // At the end [p1,p2,1,p4,0,1,1] will turn into [0,1,1,0,0,1,1] based on finalParity object values
    for(const item in finalParity){
      let index = this.parityArr.indexOf(item)
      if(index>=0){
        this.hammingCode[index] = finalParity[item].toString()
      }
    }

    // Pushing the hammingCode into toDisplay array which will be used to display to user.
    this.toDisplay.push(this.hammingCode)

    // If there is a check bit then below code will call calculateCheckBit funtion which will calculate the check bit
    if(this.checkBit === true){
      this.calculateCheckBit(this.hammingCode)
    }
  }

  // This function is used for selecting the parity bits to calculate the parity
  // for example: to calculate p1's parity we have to select one bit and then skip one bit and it continues respectively
  // and for p2's parity we have to select 2 bits skip 2 bits select 2 bits skip 2 bits etc...
  selectParityBits(n:number){
    let num = n
    let arr = [...this.parityArr] //copying parityArr to local variable arr
    let pArr = []
    let toDisplayDuplicate = []

    let s = arr.splice(0, n-1)
    for(let z=0;z<s.length;z++){
      toDisplayDuplicate.push(' ')
    }

    let newArr = [...arr]
    let flag = true

    for(let i=0;i<arr.length;i++){
      if(flag === true){
        let m = newArr.shift()
        pArr.push(m)
        toDisplayDuplicate.push(m)
        num = num - 1
      }
      else{
        num = num -1
        newArr.shift()
        toDisplayDuplicate.push(' ')
      }
      if(num == 0){
        flag = !flag
        num = n
      }
    }
    this.finalArr.push(pArr)
    this.toDisplay.push(toDisplayDuplicate)
  }

  // This function will calculate parity bits... and stores them in obj eg:{'P1': 0, 'P2': 1}
  calculateParity(arr:any){
    // Object which will store parity values ex: {'P1': 0, 'P2': 1}
    let obj: {[k: string]: any} = {};

    arr.forEach((a:any)=>{
      let x:string = a.shift()
      obj[x] = 0
      a.forEach((element:number)=>{
        obj[x] ^= element
      })
      console.log(x, obj)
    })

    this.parityValues = obj

    return obj
  }

  // This function will calculate the check bit and adds that check bit to the encoded message
  calculateCheckBit(arr:any){
    let hammingCodeWithCheckBit:string[] = []
    let count = 0

    arr.forEach((element:string) => {
      count += parseInt(element)
      hammingCodeWithCheckBit.push(element)
    })

    if(count%2 == 0){
      hammingCodeWithCheckBit.splice(0,0,'0')
    }else{
      hammingCodeWithCheckBit.splice(0,0,'1')
    }

    this.hammingCodeWithCheckBit = hammingCodeWithCheckBit
  }

  

}
