import React, { Component } from 'react';
import {DataList, Layout, LayoutPanel, DataGrid, GridColumn, Tabs, TabPanel, Tree ,Accordion, AccordionPanel,Form, Dialog, TextBox, NumberBox, Label, LinkButton, ButtonGroup} from 'rc-easyui';
import Axios from "axios";
import {AxiosRequestConfig} from "../utilities/public.config";
import './home.css'

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            companyList:[{id:1,name:"上海轩田1"},{id:2,name:"杭州轩田1"}],
            secondItem: [],
            tableData: [],
            active:1,
            accordionKey:'3',
            editingRow: null,
            model: {},
            rules: {
                'itemid': 'required',
                'name': ['required', 'length[5,10]']
            },
            errors: {},
            title: '',
            closed: true
        }
    }

    /* 初始化数据 */
    csh=()=>{
        let values = null
        Axios.get(`/companies`, AxiosRequestConfig(values))
            .then((respones) => {
                const result = respones.data;
                this.setState({
                    companyList: result,
                    active: result[0].id
                })
                Axios.get('/organization/'+  result[0].id +'/suborg', AxiosRequestConfig(values))
                    .then((res) => {
                        const res1 = res.data;
                        this.setState({
                            secondItem: res1,
                            accordionKey:"" + res1[0].id
                        })
                        Axios.get('/organization/'+ res1[0].id +'/employee', AxiosRequestConfig(values))
                            .then((respone) => {
                                const res2 = respone.data;
                                this.setState({
                                    tableData: res2
                                })
                            }).catch((error) => {
                            console.log("***************:获取人员列表失败");
                        })
                    }).catch((error) => {
                    console.log("***************:获取二级失败");
                })
            }).catch((error) => {
            console.log("***************:获取公司失败");
        })
    }
    /* 获取二级部门 */
    getSection(v,e){
        let values = null
        Axios.get('/organization/'+  v.id +'/suborg', AxiosRequestConfig(values))
            .then((res) => {
                const res1 = res.data;
                this.setState({
                    secondItem: res1,
                    accordionKey:"" + res1[0].id
                })
                Axios.get('/organization/'+ res1[0].id +'/employee', AxiosRequestConfig(values))
                    .then((respone) => {
                        const res2 = respone.data;
                        this.setState({
                            tableData: res2
                        })
                    }).catch((error) => {
                    console.log("***************:获取人员列表失败");
                })
            }).catch((error) => {
            console.log("***************:获取二级失败");
        })
    }
    /* 获取人员列表 */
    getEmp=(v,e)=>{
        console.log(this)
        console.log(v)
        let values = null
        Axios.get('/organization/'+v.id +'/employee', AxiosRequestConfig(values))
            .then((respone) => {
                const res2 = respone.data;
                this.setState({
                    tableData: res2,
                    accordionKey:''+ v.id
                })
            }).catch((error) => {
            console.log("***************:获取人员列表失败");
        })
    }
    /* 选择公司 */
    handleSelectionChange(selection) {
        console.log(selection)
        this.getSection(selection)
        this.setState({ active: selection.id })
    }
    renderItem({ row }) {
        return (
            <div  className={`com-li ${this.state.active==row.id?"datagrid-row-selected":''}`}  >
                <div className="detail">
                    <sapn >{row.name}</sapn>
                </div>
            </div>
        )
    }
    selectSec=(v)=>{
        let obj = {
            id:-1
        }
        this.state.secondItem.forEach((val,idx) => {
            if(val.name == v.props.title) {
                obj.id = val.id
            }
        })
        this.getEmp(obj)
    }

    selectThird=(v,e)=>{
        console.log(v)
        this.getEmp(v)
    }

    getError(name) {
        const { errors } = this.state;
        return errors[name] && errors[name].length
            ? errors[name][0]
            : null;
    }
    editRow(row) {
        this.setState({
            editingRow: row,
            model: Object.assign({}, row),
            title: 'Edit',
            closed: false
        });
    }
    saveRow() {
        this.form.validate(() => {
            if (this.form.valid()) {
                let row = Object.assign({}, this.state.editingRow, this.state.model);
                let data = this.state.tableData.slice();
                let index = data.indexOf(this.state.editingRow);
                data.splice(index, 1, row);
                this.setState({
                    tableData: data,
                    closed: true
                })
            }
        })
    }
    deleteRow(row) {
        this.setState({
            tableData: this.state.tableData.filter(r => r !== row)
        })
    }
    renderDialog() {
        const row = this.state.model;
        const { title, closed, rules } = this.state;
        return (
            <Dialog modal title={title} closed={closed} onClose={() => this.setState({ closed: true })}>
                <div className="f-full" style={{ padding: '20px 50px' }}>
                    <Form className="f-full"
                          ref={ref => this.form = ref}
                          model={row}
                          rules={rules}
                          onValidate={(errors) => this.setState({ errors: errors })}
                    >
                        <div style={{ marginBottom: 10 }}>
                            <Label htmlFor="itemid">Item ID:</Label>
                            <TextBox inputId="itemid" name="itemid" value={row.itemid} style={{ width: 220 }}></TextBox>
                            <div className="error">{this.getError('itemid')}</div>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <Label htmlFor="name">Name:</Label>
                            <TextBox inputId="name" name="name" value={row.name} style={{ width: 220 }}></TextBox>
                            <div className="error">{this.getError('name')}</div>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <Label htmlFor="listprice">List Price:</Label>
                            <NumberBox inputId="listprice" name="listprice" value={row.listprice} precision={1} style={{ width: 220 }}></NumberBox>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <Label htmlFor="unitcost">Unit Cost:</Label>
                            <NumberBox inputId="unitcost" name="unitcost" value={row.unitcost} style={{ width: 220 }}></NumberBox>
                        </div>
                    </Form>
                </div>
                <div className="dialog-button">
                    <LinkButton style={{ width: 80 }} onClick={() => this.saveRow()}>Save</LinkButton>
                    <LinkButton style={{ width: 80 }} onClick={() => this.setState({ closed: true })}>Close</LinkButton>
                </div>
            </Dialog>
        )
    }

    componentWillMount(){
        this.csh();
    }


    render() {
        return (
            <div>
                <Layout style={{ width: '100%', minHeight: 450 }}>
                    <LayoutPanel region="west" split style={{ width: 250 }}>
                        <DataList
                            style={{ height: 100 }}
                            renderItem={this.renderItem.bind(this)}
                            data={this.state.companyList}
                            selectionMode="single"
                            onSelectionChange={this.handleSelectionChange.bind(this)}
                        />
                        <div style={{width: "100%",height: "25px"}}></div>
                        <Accordion className="a1" animate  onPanelSelect={this.selectSec.bind(this)}>
                            {
                                this.state.secondItem.map((menu, index) => (
                                    <AccordionPanel
                                        key={menu.id}
                                        title={menu.name}
                                        iconCls={'fa fa-' + menu.id}
                                    >
                                        <div style={{ padding: 5 }}>
                                            {
                                                menu.children.map((item, index) => (
                                                    <div  className="item" key={item.id} onClick={this.selectThird.bind(this,item)}>{item.name}</div>
                                                ))
                                            }
                                        </div>
                                    </AccordionPanel>
                                ))
                            }
                        </Accordion>
                    </LayoutPanel>
                    <div>
                        <DataGrid data={this.state.tableData} style={{ height: 450 }}>
                            <GridColumn field="id" title="编号"></GridColumn>
                            <GridColumn field="name" title="姓名"></GridColumn>
                            <GridColumn field="email" title="E-mail" align="right"></GridColumn>
                            <GridColumn field="act" title="操作" align="center" width={110}
                                        render={({ row }) => (
                                            <div>
                                                <ButtonGroup>
                                                    <LinkButton onClick={() => this.editRow(row)}>Edit</LinkButton>
                                                    <LinkButton onClick={() => this.deleteRow(row)}>Delete</LinkButton>
                                                </ButtonGroup>
                                            </div>
                                        )}
                            />
                        </DataGrid>
                        {this.renderDialog()}
                    </div>
                </Layout>

              {/*  <Tree data={this.state.data} clickToEdit></Tree>*/}

            </div>

        );
    }
}

export default Index;
