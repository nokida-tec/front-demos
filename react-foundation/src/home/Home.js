import React, { Component } from 'react';
import {Button,Colors, Sizes,Grid,Cell,Accordion, AccordionItem, AccordionTitle, AccordionContent,Menu,MenuItem} from 'react-foundation';
import Axios from "axios";
import {AxiosRequestConfig} from "../utilities/public.config";
import './home.css'
import Toast from '../compents/toast'

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            companyList:[{id:1,name:"上海轩田1"},{id:2,name:"杭州轩田1"}],
            secondItem: [],
            tableData: [],
            active:1,
            accordionKey:3,
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
                            accordionKey:res1[0].id
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
                    accordionKey:res1[0].id
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
        let values = null
        Axios.get('/organization/'+v.id +'/employee', AxiosRequestConfig(values))
            .then((respone) => {
                const res2 = respone.data;
                this.setState({
                    tableData: res2,
                    accordionKey: v.id
                })
            }).catch((error) => {
            console.log("***************:获取人员列表失败");
        })
    }
    /*3级获取人员*/
    getThirdEmp=(v,e)=>{
        let values = null
        Axios.get('/organization/'+v.id +'/employee', AxiosRequestConfig(values))
            .then((respone) => {
                const res2 = respone.data;
                this.setState({
                    tableData: res2,
                })
            }).catch((error) => {
            console.log("***************:获取人员列表失败");
        })
    }


    componentWillMount(){
        this.csh()
    }

    /* 选择公司 */
    selectCom(selection) {
        console.log(selection)
        this.getSection(selection)
        this.setState({ active: selection.id })
    }

    selectSec=(v,e)=>{
        console.log(v)
        this.getEmp(v)
    }

    selectThird=(v,e)=>{
        console.log(v)
        this.getThirdEmp(v)
    }

    edit=(v)=>{
        console.log(v)
        Toast.success('编辑成功',3000)
    }
    del=(v)=>{
        const arrs= this.state.tableData;
        arrs.splice(v,1);
        this.setState({
            del: v,
            tableData:arrs
        })
        Toast.success('删除成功',3000)
    }


    render() {
        let tableDom = this.state.tableData.map((item, index) => (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                    <Button size={Sizes.TINY} color={Colors.SUCCESS} className={'table-btn'} onClick={this.edit.bind(item)}>编辑</Button>
                    <Button size={Sizes.TINY} color={Colors.ALERT} className={'table-btn'}  onClick={this.del.bind(index)}>删除</Button>
                </td>
            </tr>
        ))
        return (
            <div>
                <Grid className="display">
                    <Cell small={2} large={2}>
                        <div className="menu-nested-example">
                            <div className={'com-con'}>
                                <Menu isVertical>
                                    {
                                        this.state.companyList.map((item, index) => (
                                            <MenuItem isActive={this.state.active === item.id} onClick={this.selectCom.bind(this,item)}>
                                                <a className={'com-name'}>{item.name}</a>
                                            </MenuItem>
                                        ))
                                    }
                                </Menu>
                            </div>
                        </div>

                        <Accordion>
                            {
                                this.state.secondItem.map((item, index) => (
                                    <AccordionItem>
                                        <AccordionTitle className={`${this.state.accordionKey==item.id?"accordion-tle":''}`} onClick={this.selectSec.bind(this,item)}>{item.name}</AccordionTitle>
                                        <AccordionContent className={`${this.state.accordionKey==item.id?"accordion-con":''}`}>
                                            {
                                                item.children.map((v, i) => (
                                                    <div  className="item" key={v.id} onClick={this.selectThird.bind(this,v)}>{v.name}</div>
                                                ))
                                            }
                                        </AccordionContent>
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>

                    </Cell>
                    <Cell small={10} large={10}>
                        <div className={'table-con'}>
                            <table >
                                <thead>
                                <tr>
                                    <th>编号</th>
                                    <th>姓名</th>
                                    <th>E-mail</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableDom}
                                </tbody>
                            </table>
                        </div>

                    </Cell>
                </Grid>

            </div>

        );
    }
}

export default Index;
