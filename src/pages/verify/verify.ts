import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '../../http-api';

@IonicPage()
@Component({
	selector: 'page-verify',
	templateUrl: 'verify.html',
})
export class VerifyPage {

	accounts:any;
	account:any;
	constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public http: Http) {
		this.loadAccounts();
	}

	public loadAccounts()
	{
		this.accounts = [];
		this.http.get('/getUnverifiedAccounts').subscribe
		(
			(data) =>
			{
				var jsonResp = JSON.parse(data.text());
				this.accounts = jsonResp.result0;
			},
			(error) =>
			{
				alert("Error: " + error);
			}
		)
	}

	public verifyAccount(account:any)
	{
		let reqSend = {
			id: account.usrID
		};

		this.http.post('/acceptAccount', reqSend).subscribe
		(
			(data) =>
			{
				this.loadAccounts();
				this.presentToast("Account Accepted");
			},
			(error) =>
			{
				alert("Error: " + error);				
			}
		)
	}

	public discardAccount(account)
	{
		let reqSend = {
			id: account.usrID
		};
		
		this.http.post('/discardAccount', reqSend).subscribe
		(
			(data) =>
			{
				this.loadAccounts();
				this.presentToast("Account Discarded");
			},
			(error) =>
			{
				alert("Error: " + error);
			}
		)
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
