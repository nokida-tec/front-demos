import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Easyui';
  list_selection = null;
  list_data = [
		{"name":"上海","id":1},
		{"name":"杭州","id":2},
  ];
  tree_selection: any = null;
  tree_data: any[] = [{
	"id":2,
	"text":"行政人事部"
    },
	{
	"id":2,
		"text":"技术部",
		"state":"closed",
		"children":[{
			"id":1,
			"text":"电气组"
		},
		{
			"id":2,
			"text":"机械组"
		}]
	},
	{
	"id":1,
	"text":"数字化工厂"
    }
  ];
  tree_data2: any[] = [{
		"id":1,
		"text":"行政人事部",
	},
	{
		"id":2,
		"text":"财务部"
	}];
  grid_data1 = [
		{"name":"Koi","sex":"男","age":"12"},
		{"name":"Anny","sex":"男","age":"12"},
		{"name":"Tom","sex":"男","age":"12"},
		{"name":"Yami","sex":"男","age":"12"},
		{"name":"John","sex":"男","age":"12"},
	];
	grid_data2= [
		{"name":"Koi","sex":"男","age":"12"},
		{"name":"Koi","sex":"男","age":"12"},
		{"name":"Koi","sex":"男","age":"12"},
		{"name":"Koi","sex":"男","age":"12"},
		{"name":"Koi","sex":"男","age":"12"},
	];
	@ViewChild('company', null) company: any;
	@ViewChild('orgnization', null) orgnization: any;
	@ViewChild('members', null) members: any;

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
}
