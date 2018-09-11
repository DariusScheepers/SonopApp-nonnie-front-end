import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
//import { HomePage } from '../home/home';
import { Http } from '../../http-api';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  nonnieLogin: any;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public http: Http) {
    this.nonnieLogin = new FormGroup({
      pass: new FormControl()
    });
  }

  public loginNonnie(value: any)
  {
    if (value.pass == null)
    {
      this.presentToast("Please fill in password");
      return;
    }

    var jsonArr = {
      "password" : value.pass
    };

    this.http.post("/nonnie-login", jsonArr).subscribe
    (
      (data) =>
      {      
        var jsonResp = JSON.parse(data.text());
        if (jsonResp.JSONRes.success)
        {
          this.presentToast("Logged in!");
          this.navCtrl.setRoot(TabsPage);
        }
        else
        {
          alert("Invalid Login. Try Again.");
        }
      },
      (error) =>
      {
        alert("Error: " + error);         
      }
    ); 
  }

  presentToast(text){
    let toast = this.toastCtrl.create(
      {
        message: text,
        duration: 1500,
        position: 'bottom',
        dismissOnPageChange: false
      }
    );
    toast.present();
  }

}
