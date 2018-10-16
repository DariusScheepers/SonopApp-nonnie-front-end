import { Component } from '@angular/core';
import { VerifyPage } from '../verify/verify';
import { WeekendPage } from '../weekend/weekend'; 
import { SignOutPage } from '../sign-out/sign-out';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = VerifyPage;
  tab2Root = WeekendPage;
  tab3Root = SignOutPage;


  constructor() {

  }
}
