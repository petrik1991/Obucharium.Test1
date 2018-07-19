import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private logger: LoggerService) { }

  handlerUpdateError(){
    return (error: any) => {
      this.logger.debug(error.message);
  
      let messages: string[] = [];
      if(error.error.ModelState){
        for(let field in error.error.ModelState)        {
          messages = messages.concat(error.error.ModelState[field]);
        }
      }
      else{
        messages.push(error.message);
      }
  
      return throwError({
        messages: messages
      })
    }
  }
}
