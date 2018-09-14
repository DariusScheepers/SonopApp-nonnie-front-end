import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '../../http-api';

@IonicPage()
@Component({
  selector: 'page-weekend',
  templateUrl: 'weekend.html',
})
export class WeekendPage {

	Hk:any = [];
	WS:any = [];
	WJ:any = [];
	OS:any = [];
	OJ:any = [];
	NS:any = [];
	NJ:any = [];
	Sr:any = [];
	St:any = [];
	VW:any = [];
	EJ:any = [];
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
		this.getWeekendSignIns();
	}

	public getWeekendSignIns()
	{
		this.http.get('/weekendSignInList').subscribe
		(
			(data) =>
			{
				this.Hk = [];
				var jsonResp = JSON.parse(data.text());
				jsonResp.result0.forEach(element => 
				{	
					switch (element.talName) {
						case "HK":
							this.Hk.push(element);
							break;
						case "Weste Senior":
							this.WS.push(element);
							break;
						case "Weste Junior":
							this.WJ.push(element);
							break;
						case "Ooste Senior":
							this.OS.push(element);
							break;
						case "Ooste Junior":
							this.OJ.push(element);
							break;
						case "Noorde Senior":
							this.NS.push(element);
							break;
						case "Noorde Junior":
							this.NJ.push(element);
							break;
						case "Sentraal":
							this.Sr.push(element);
							break;
						case "Senaat":
							this.St.push(element);
							break;
						case "Verre Weste":
							this.VW.push(element);
							break;
						case "Eerste Jaar":
							this.EJ.push(element);
							break;
					}
				});
			},
			(error) =>
			{
				alert("Error: " + error);
			}
		)
		
	}

}
