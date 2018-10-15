import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Http } from '../../http-api';
import * as papa from 'papaparse';

/**
 * Generated class for the SignOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-sign-out',
    templateUrl: 'sign-out.html',
})
export class SignOutPage {

	lunchMeal:any;
	lunchMealStatus:any;
	dinnerMeal:any;
	dinnerMealStatus:any;
	seatingMapList:any = [];
	lunchCount:any;
	dinnerCount:any;
    constructor(public navCtrl: NavController, public http: Http) {
		this.getCurrentSignOut();
    }

    public getCurrentSignOut()
    {
		this.http.get('/currentSignInList').subscribe
		(
			(data) =>
			{
				this.seatingMapList = [];
				this.lunchCount = 0;
				this.dinnerCount = 0;
				var jsonResp = JSON.parse(data.text()).JSONRes;
				this.lunchMeal = jsonResp.lunchMeal;
				this.dinnerMeal = jsonResp.dinnerMeal;
				this.lunchMealStatus = jsonResp.lunchOpenStatus;
				this.dinnerMealStatus = jsonResp.dinnerMealStatus;
				for (let element of jsonResp.seatingMap)
				{
					this.seatingMapList.push(element);
					if (element[2] == 2)
						this.lunchCount++;
					if (element[3] == 2)
						this.dinnerCount++;
				}				
			},
			(error) =>
			{
				alert("Error: " + error);
			}
		)
	}
	
	public downloadCSV() {
		var csvHeaderA = ["Table", "Student", this.lunchMeal, this.dinnerMeal];

		let csv = papa.unparse({
			fields: csvHeaderA,
			data: this.seatingMapList
		});
		
		// Dummy implementation for Desktop download purpose
		var blob = new Blob([csv]);
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(blob);
		var today = new Date();
		a.download = today.getDate() + "-" + today.getMonth() + " Sign In List.csv";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	public refresh()
	{
		this.getCurrentSignOut();
	}
}
