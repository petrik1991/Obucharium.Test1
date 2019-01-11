import { Injectable } from '@angular/core';
import { action, observable} from 'mobx';

export type States = 'NAVIGATION' | 'SHOW_ITEM' | 'EDIT_ITEM' | 'NEW_ITEM';

@Injectable()
export class CatralogStates {
  @observable state = 'NAVIGATION';

   @action setState(state: States) {
    this.state = state;
   }
}