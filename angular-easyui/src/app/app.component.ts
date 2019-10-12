import { Component, OnInit, OnDestroy } from '@angular/core';

import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { OrganizationService } from './organization.service';
import { MemberService } from './member.service';
import { CampanyService } from './company.service';
import { ICompany } from './organization.model';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
  })

export class AppComponent implements OnInit, OnDestroy {
  eventSubscriber: Subscription;
  title = 'Angular-Easyui';
  list_selection = null;
  list_data = null;
/*  list_data = [
		{"code":"FI-SW-01","name":"上海轩田","unitcost":10.00,"status":"P","listprice":36.50,"attr":"Large","itemid":"EST-1"},
		{"code":"K9-DL-01","name":"杭州轩田","unitcost":12.00,"status":"P","listprice":18.50,"attr":"Spotted Adult Female","itemid":"EST-2"},
  ];
  */
  tree_selection: any = null;
  tree_data: any[] = [{
		"id":1,
		"text":"My Documents",
		"children":[{
			"id":11,
			"text":"Photos",
			"state":"closed",
			"children":[{
				"id":111,
				"text":"Friend"
			},{
				"id":112,
				"text":"Wife"
			},{
				"id":113,
				"text":"Company"
			}]
		},{
			"id":12,
			"text":"Program Files",
			"children":[{
				"id":121,
				"text":"Intel"
			},{
				"id":122,
				"text":"Java"
			},{
				"id":123,
				"text":"Microsoft Office"
			},{
				"id":124,
				"text":"Games"
			}]
		},{
			"id":13,
			"text":"index.html"
		},{
			"id":14,
			"text":"about.html"
		},{
			"id":15,
			"text":"welcome.html"
		}]
	}];
  grid_data = [
		{"code":"FI-SW-01","name":"Koi","unitcost":10.00,"status":"P","listprice":36.50,"attr":"Large","itemid":"EST-1"},
		{"code":"K9-DL-01","name":"Dalmation","unitcost":12.00,"status":"P","listprice":18.50,"attr":"Spotted Adult Female","itemid":"EST-10"},
		{"code":"RP-SN-01","name":"Rattlesnake","unitcost":12.00,"status":"P","listprice":38.50,"attr":"Venomless","itemid":"EST-11"},
		{"code":"RP-SN-01","name":"Rattlesnake","unitcost":12.00,"status":"P","listprice":26.50,"attr":"Rattleless","itemid":"EST-12"},
		{"code":"RP-LI-02","name":"Iguana","unitcost":12.00,"status":"P","listprice":35.50,"attr":"Green Adult","itemid":"EST-13"},
		{"code":"FL-DSH-01","name":"Manx","unitcost":12.00,"status":"P","listprice":158.50,"attr":"Tailless","itemid":"EST-14"},
		{"code":"FL-DSH-01","name":"Manx","unitcost":12.00,"status":"P","listprice":83.50,"attr":"With tail","itemid":"EST-15"},
		{"code":"FL-DLH-02","name":"Persian","unitcost":12.00,"status":"P","listprice":23.50,"attr":"Adult Female","itemid":"EST-16"},
		{"code":"FL-DLH-02","name":"Persian","unitcost":12.00,"status":"P","listprice":89.50,"attr":"Adult Male","itemid":"EST-17"},
		{"code":"AV-CB-01","name":"Amazon Parrot","unitcost":92.00,"status":"P","listprice":63.50,"attr":"Adult Male","itemid":"EST-18"}
	];

	constructor(
		protected organizationService: OrganizationService,
		protected companyService: CampanyService,
		protected employeeService: MemberService,
		protected eventManager: JhiEventManager
		) {}

  loadAll() {
    this.companyService
      .query({
        page: 0,
        size: 50,
      })
      .subscribe(
        (res: HttpResponse<ICompany[]>) => this.paginateShippers(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInShippers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICompany) {
    return item.id;
  }

  registerChangeInShippers() {
    this.eventSubscriber = this.eventManager.subscribe('shipperListModification', response => this.loadAll());
  }

  protected paginateShippers(data: ICompany[], headers: HttpHeaders) {
    this.list_data = data;
  }

  protected onError(errorMessage: string) {
    //this.error(errorMessage, null, null);
  }
}
