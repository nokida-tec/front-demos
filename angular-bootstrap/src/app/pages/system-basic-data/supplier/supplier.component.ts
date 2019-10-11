import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs/index";
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/data/smart-table';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NbComponentSize} from "@nebular/theme";


@Component({
  selector: 'ngx-supplier',
  templateUrl: 'supplier.component.html',
  styleUrls: ['supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
  sizes: NbComponentSize[] = [ 'medium'];
  private destroy$: Subject<void> = new Subject<void>();
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      columnTitle: '操作',
      position: 'right',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false,
      },
      firstName: {
        title: 'First Name',
        type: 'string',
        filter: false,
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
        filter: false,
      },
      username: {
        title: 'Username',
        type: 'string',
        filter: false,
      },
      email: {
        title: 'E-mail',
        type: 'string',
        filter: false,
      },
      age: {
        title: 'Age',
        type: 'number',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
