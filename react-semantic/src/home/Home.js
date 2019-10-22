import React, { Component } from 'react';

import Axios from "axios";
import {AxiosRequestConfig} from "../utilities/public.config";
import './home.css'
import Toast from '../compents/toast'
import {
    Accordion,
    Button,
    Container,
    Divider,
    Grid,
    Icon,
    List,
    Table,
    Responsive,
    Segment,
    Sidebar,
    Visibility
} from 'semantic-ui-react'

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            companyList:[{id:1,name:"上海轩田1"},{id:2,name:"杭州轩田1"}],
            secondItem: [],
            tableData: [],
            active:1,
            activeIndex:3,
            thirdId:0,
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
                            activeIndex:res1[0].id
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
                    activeIndex:res1[0].id
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
                    activeIndex: v.id
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

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ thirdId: -1})
        let obj = {
            id: titleProps.index
        }
        this.getEmp(obj)
    }

    selectThird=(v,e)=>{
        console.log(v)
        this.setState({ thirdId: v.id })
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
            <Table.Row>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell selectable>
                    <Button color='twitter' size='mini' onClick={this.edit.bind(item)}>
                        编辑
                    </Button>
                    <Button color='youtube' size='mini' onClick={this.del.bind(item)}>
                        删除
                    </Button>
                </Table.Cell>
            </Table.Row>
        ))
        return (
            <div>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <List link className={'com-list'}>
                                {
                                    this.state.companyList.map((item, index) => (
                                        <List.Item active={this.state.active === item.id} className={'com-li'} onClick={this.selectCom.bind(this,item)}>{item.name}</List.Item>
                                    ))
                                }
                            </List>
                            <div className={'white-div'}></div>
                            <Accordion className={'accord-con'}>
                                {
                                    this.state.secondItem.map((item, index) => (
                                        <div>
                                            <Accordion.Title active={this.state.activeIndex === item.id} className={`${this.state.activeIndex==item.id?"accordion-tle":''}`} index={item.id} onClick={this.handleClick}>
                                                <Icon name='dropdown' />
                                                {item.name}
                                            </Accordion.Title>
                                            <Accordion.Content active={this.state.activeIndex === item.id}>
                                                <List>
                                                    {
                                                        item.children.map((v, i) => (
                                                            <List.Item className={`third-li ${this.state.thirdId==v.id?"third-tle":''}`} onClick={this.selectThird.bind(this,v)}>{v.name}</List.Item>
                                                        ))
                                                    }
                                                </List>
                                            </Accordion.Content>
                                        </div>
                                    ))
                                }
                            </Accordion>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>编号</Table.HeaderCell>
                                        <Table.HeaderCell>姓名</Table.HeaderCell>
                                        <Table.HeaderCell>Email</Table.HeaderCell>
                                        <Table.HeaderCell>操作</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {tableDom}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>

        );
    }
}

export default Index;
