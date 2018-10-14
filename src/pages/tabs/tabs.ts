import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
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
