import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import "uikit/dist/js/uikit-core.js";
import "uikit/dist/js/uikit.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-UIKit';
  list_selection = null;
  list_data = [
		{"name":"上海","id":1},
		{"name":"杭州","id":2},
  ];
  tree_selection: any = null;
  tree_data1: any[] = [{
	"id":11,
	"text":"行政人事部"
    },
	{
	"id":12,
		"text":"技术部",
		"state":"closed",
		"children":[{
			"id":13,
			"text":"电气组"
		},
		{
			"id":14,
			"text":"机械组"
		}]
	},
	{
	"id":15,
	"text":"数字化工厂"
    }
  ];
  tree_data2: any[] = [{
		"id":21,
		"text":"行政人事部",
	},
	{
		"id":22,
		"text":"财务部"
	}];
  tree_data = this.tree_data1;
  grid_data1 = [
		{"id":"1","name":"Koi","sex":"男","age":"12"},
		{"id":"2","name":"Sunny","sex":"男","age":"12"},
		{"id":"3","name":"Anny","sex":"男","age":"12"},
		{"id":"4","name":"Tom","sex":"男","age":"12"},
		{"id":"5","name":"John","sex":"男","age":"12"},
	];
	grid_data2= [
		{"id":"11","name":"Koi1","sex":"男","age":"12"},
		{"id":"12","name":"Koi2","sex":"男","age":"12"},
		{"id":"13","name":"Koi3","sex":"男","age":"12"},
		{"id":"14","name":"Koi4","sex":"男","age":"12"},
		{"id":"15","name":"Koi5","sex":"男","age":"12"},
	];
	grid_data = this.grid_data1;

	@ViewChild('company', null) company: any;
	@ViewChild('company_uikit', null) company_uikit: any;
	@ViewChild('orgnization', null) orgnization: any;
	@ViewChild('members', null) members: any;
    //private renderer2: Renderer2;

	ngOnInit() {

	}

	onTreeSelectedChange = (node) => {
		//this.selectedCarObj = this.cars.find((c)=> c  .make==this.selectedCar);
		console.log(node);
		if (node.id === 1) {
			this.members.data = this.grid_data1;
		} else if (node.id === 2) {
			this.members.data = this.grid_data2;
		}
	}

	onListSelectedChange = (node) => {
		//this.selectedCarObj = this.cars.find((c)=> c  .make==this.selectedCar);
		console.log(node);
		if (node.id === 1) {
			this.orgnization.data = this.tree_data;
		} else if (node.id === 2) {
			this.orgnization.data = this.tree_data2;
		}
	}

	onEdit = (node) => {
		//this.selectedCarObj = this.cars.find((c)=> c  .make==this.selectedCar);
		console.log(node);
		alert("Edit the node: " + node);
	}

	onDelete = (node) => {
		//this.selectedCarObj = this.cars.find((c)=> c  .make==this.selectedCar);
		console.log(node);
		alert("Delete the node: " + node);
	}

	onCompanyClick = (id, event) => {
		console.log(id + event);
		console.log(this.company_uikit.nativeElement.children[id-1]);
		this.list_selection = id;
		//this.renderer2.setStyle(this.company_uikit.nativeElement.children[id-1],'class','.uk-active')
		if (id === 1) {
			this.tree_data = this.tree_data1;
			this.orgnization.data = this.tree_data;
		} else if (id === 2) {
			this.tree_data = this.tree_data2;
			this.orgnization.data = this.tree_data2;
		}
	}

	subClick = false;
	onTreeClick = (index, id, event) => {
		console.log(id + event);
		console.log(this.company_uikit.nativeElement.children[id-1]);

		if (this.subClick === true)
		{
			this.subClick = false;
		} else {
			this.tree_selection = id;
			console.log(this.tree_selection);

			//this.renderer2.setStyle(this.company_uikit.nativeElement.children[id-1],'class','.uk-active')
			if (id % 2 === 1) {
				this.grid_data = this.grid_data1;
				this.members.data = this.grid_data1;
			} else if (id % 2 === 0) {
				this.grid_data = this.grid_data2;
				this.members.data = this.grid_data2;
			}
		}
	}

	onTreeSubClick = (index, id, event) => {
		console.log(id + event);
		console.log(this.company_uikit.nativeElement.children[id-1]);
		this.tree_selection = id;
		console.log(this.tree_selection);
		//this.renderer2.setStyle(this.company_uikit.nativeElement.children[id-1],'class','.uk-active')
		this.subClick = true;
		if (id % 2 === 1) {
			this.grid_data = this.grid_data1;
			this.members.data = this.grid_data1;
		} else if (id % 2 === 0) {
			this.grid_data = this.grid_data2;
			this.members.data = this.grid_data2;
		}
	}
}
