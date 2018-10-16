import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '../../http-api';
import { presentToast, handleError } from '../../app-functions';

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
				handleError(this.navCtrl,error,this.toastCtrl);
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
				presentToast(this.toastCtrl,"Account Accepted");
			},
			(error) =>
			{
				handleError(this.navCtrl, error, this.toastCtrl);				
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
				presentToast(this.toastCtrl,"Account Discarded");
			},
			(error) =>
			{
				handleError(this.navCtrl, error, this.toastCtrl);
			}
		)
	}
}
