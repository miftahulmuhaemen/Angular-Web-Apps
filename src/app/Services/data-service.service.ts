import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataServiceService {

    private messageSource = new BehaviorSubject<number>(0);
    currentMessage = this.messageSource.asObservable();


    private nameSource = new BehaviorSubject<string>("");
    nameMessage = this.nameSource.asObservable();

    constructor() { }

    changeMessage(message: number) {
      this.messageSource.next(message)
    }

    changeName(message: string){
      this.nameSource.next(message)
    }


}
