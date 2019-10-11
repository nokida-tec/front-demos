import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/index";
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../@core/data/smart-table';
import 'rxjs/add/operator/map';
import {HttpResponse} from '@angular/common/http';
import {EmpManageService} from './emp-manage.service';


@Component({
  selector: 'ngx-emp-manage',
  templateUrl: './emp-manage.component.html',
  styleUrls: ['./emp-manage.component.scss']
})
export class EmpManageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  themes = [];
  currentChecked = 1;
  currentCheckedOne = 1;
  oneLevelList = [];
  settings = {
    actions: {
      add: false,
      columnTitle: '操作',
      position: 'right',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false,
      },
      name: {
        title: '姓名',
        type: 'string',
        filter: false,
      },
      phoneNumber: {
        title: '电话',
        type: 'number',
        filter: false,
      },
      email: {
        title: 'E-mail',
        type: 'string',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private empService: EmpManageService) {
    this.getCompany();
    const data = this.service.getData();
    console.log(data)
    this.source.load(data);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /* 初始化获取公司架构 */
  getCompany() {
    console.log('@@@@@@@@@@@@@@@@@')
    this.empService.acquireCompanies()
      .subscribe((res: any) => {
          console.log(res);
          this.themes = res;
          this.currentChecked = this.themes[0].id;
          console.log(this.currentChecked);
          this.empService.acquireDepartment(this.themes[0].id)
            .subscribe((res1: any) => {
                console.log(res1);
                this.oneLevelList = res1;
                this.currentCheckedOne = res1[0].id;
                this.empService.acquireEmp(res1[0].id)
                  .subscribe((res2: any) => {
                      console.log(res2);
                      this.source.load(res2);
                    },
                    (res: any) => {
                      console.log(res)
                    }
                  );
              },
              (res: any) => {
                console.log(res)
              }
            );
        },
        (res: any) => {
          console.log(res)
        }
      );
  };

  /*获取二级部门 */
  getSection(v){
    this.empService.acquireDepartment(v)
      .subscribe((res: any) => {
          console.log(res);
          this.oneLevelList = res;
        },
        (res: any) => {
          console.log(res)
        }
      );
  }

  /* 获取人员列表 */
  getEmp(v){
    this.empService.acquireEmp(v)
      .subscribe((res: any) => {
          console.log(res);
          this.source.load(res);
        },
        (res: any) => {
          console.log(res)
        }
      );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  /* 选择下拉选择框 */
  changeTheme(obj) {
    console.log(obj);
    this.themes.forEach((v, i) => {
      if (obj.id === v.id) {
        this.currentChecked = this.themes[i].id;
        this.getSection(this.themes[i].id);
      }
    })
  }

  /* 部门点击查看具体信息 */
  viewInfo(v) {
    console.log(v);
    this.currentCheckedOne = v.id;
    this.getEmp(v.id)
  }

  /* 点击查看具体信息 */
  viewInfo2(v) {
    this.getEmp(v.id)
  }

}

