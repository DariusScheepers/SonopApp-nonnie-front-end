import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '../../http-api';
import { File } from '@ionic-native/file';
import * as papa from 'papaparse';

@IonicPage()
@Component({
  selector: 'page-weekend',
  templateUrl: 'weekend.html',
})
export class WeekendPage {

	seatingMap = [];
	seatingMapList = [];
	meals = ["Friday Dinner","Satudray Brunch","Satudray Dinner","Sunday Breakfast","Sunday Lunch","Sunday Dinner"];
	countFrD:any;
	countSaB:any;
	countSaD:any;
	countSuB:any;
	countSuL:any;
	countSuD:any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private file: File) {
		this.getWeekendSignIns();
	}

	public getWeekendSignIns()
	{
		this.http.get('/weekendSignInList').subscribe
		(
			(data) =>
			{
				this.seatingMap = [];
				this.seatingMapList = [];
				this.countFrD = 0;
				this.countSaB = 0;
				this.countSaD = 0;
				this.countSuB = 0;
				this.countSuL = 0;
				this.countSuD = 0;
				var jsonResp = JSON.parse(data.text());
				this.seatingMap = jsonResp.seatingMap;
				this.seatingMap.forEach(element0 => {
					element0.forEach(element1 => {
						this.seatingMapList.push(element1);
						if (element1[2] == 1)
							this.countFrD++;
						if (element1[3] == 1)
							this.countSaB++;
						if (element1[4] == 1)
							this.countSaD++;
						if (element1[5] == 1)
							this.countSuB++;
						if (element1[6] == 1)
							this.countSuL++;
						if (element1[7] == 1)
							this.countSuD++;
					});
				});
			},
			(error) =>
			{
				alert("Error: " + error);
			}
		)
	}

	public downloadCSV() {
		var csvHeaderA = ["Table","Student","Friday Dinner","Satudray Brunch","Satudray Dinner","Sunday Breakfast","Sunday Lunch","Sunday Dinner"];

		let csv = papa.unparse({
			fields: csvHeaderA,
			data: this.seatingMapList
		});
		
		// Dummy implementation for Desktop download purpose
		var blob = new Blob([csv]);
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(blob);
		a.download = "Weekend Sign In " + this.getNextDayOfWeek(5) + "-" + this.getNextDayOfWeek(0) + ".csv";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	private getNextDayOfWeek(dayOfWeek) {
		var date = new Date();
		var resultDate = new Date();
		resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
	
		return resultDate.getDate().toString() + "/" + resultDate.getMonth().toString();
	}

	public refresh()
	{
		this.getWeekendSignIns();
	}
}
