import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { version } from '../package.json';
import './index.less'
import {Toast} from 'react-uikits'

import {
    HomePage,
    BasicPage, ButtonPage,
    CalendarPage, CarouselPage, CheckBoxPage, CheckBoxGroupPage, ConfirmBoxPage, CardPage, CommentPage, CrumbPage,
    DatePickerPage, DateTimePickerPage, DropDownPage,
    FormPage,
    GridPage,
    IconPage, ImagePage, InputPage, ItemPage, InstallPage, InputNumberPage,
    LabelPage, LoaderPage, ListPage,
    MenuPage, ModalPage,
    NoticePage,
    OtherPage,
    PaginationPage, PinPage, PanelPage, ProgressPage,
    RadioPage, RadioGroupPage,
    SlideMenuPage, StartPage,
    ToastPage, TabPage, TimeInputPage, TimePickerPage, TooltipPage, TablePage, TextPage, TempPage, ThemePage,
    ValidatorPage,
} from './page';

import {CN, TitleBlock} from './util/tools';
import {COLORS, LARGE_VIEW, MOBILE_VIEW, NAV_MAP, NS, SMALL_VIEW, TABLET_VIEW} from './constant';
import Axios from "axios";
import {AxiosRequestConfig} from "./util/public.config";
import Hightlight from "react-highlight";
const NAV_MAP_KEYS = Object.keys(NAV_MAP)


const asideLinks = () => {
    return NAV_MAP_KEYS.map(key => {
        return (
            <div className="group" key={key}>
                <h4> {key} </h4>
                {NAV_MAP[key].map(item => {
                    return (
                        <span key={item.route}>
                            {item.route === '/component' ?
                                <NavLink exact to="/component">{item.name}</NavLink>
                                : <NavLink to={item.route}>{item.name}</NavLink>}
                        </span>
                    )
                })}
            </div>
        )
    })
}

const Header = props => {
    return (
        <header className={CN('basic block main-nav')}>
            <div className={CN('container')}>
                <div className={CN('basic table')}>
                    <div className="row">
                        <div className="cell">
                            <h2><NavLink to="/">React UIKits</NavLink></h2>
                        </div>
                        <div className="text-right cell">
                            <NavLink exact className="link" to="/">首页</NavLink>
                            <NavLink className="link" to="/component">组件</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

const Footer = props => {
    return (
        <footer className="main-footer">
            <div className={CN('container')}>
                <div className={CN('basic table')}>
                    <div className="row">
                        <div className="cell">
                            <h4>{`React UIKits@${version}`}</h4>
                        </div>
                        <div className="text-right cell">
                            <a href="https://github.com/jerryshew/react-uikits" target="_blank">Github</a>
                            <a href="http://braavos.me" target="_blank">Blog</a>
                            <a href="https://github.com/wecatch" target="_blank">team</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}



class MobileContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            companyList:[{id:1,name:"上海轩田1"},{id:2,name:"杭州轩田1"}],
            secondItem: [],
            tableData: [],
            active:1,
            activeIndex:3,
            thirdId:0,
        }
    }
    /* 初始化数据 */
    csh(){
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
    getEmp (v,e){
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
    getThirdEmp(v,e){
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
    /* 选择公司 */
    selectCom(selection) {
        console.log(selection)
        this.getSection(selection)
        this.setState({ active: selection.id })
    }
    selectSec (v, e) {
        console.log(v)
        this.setState({ thirdId: -1})
        this.getEmp(v)
    }
    selectThird(v,e){
        console.log(v)
        this.setState({ thirdId: v.id })
        this.getThirdEmp(v)
    }
    edit(v){
        console.log(v)
        Toast.success('编辑成功')
    }
    del(v,e){
        console.log(e)
        console.log(v)
        const arrs= t;
        arrs.splice(v,1);
        this.setState({
            del: v,
            tableData:arrs
        })
    }
    componentWillMount(){
        this.csh()
    }
    render() {
        let tableDom = this.state.tableData.map((item, index) => (
            <tr>
                <td width="150px">{item.id}</td>
                <td width="200px">{item.name}</td>
                <td width="400px">{item.email}</td>
                <td>
                    <button className={"dot blue btn" } onClick={this.edit.bind(item)}>编辑</button>
                    <button className={'dot red btn'} onClick={()=>{
                        const arrs= this.state.tableData;
                        arrs.splice(index,1);
                        this.setState({
                            del: index,
                            tableData:arrs
                        })
                        Toast.success('删除成功')
                    }}>删除</button>
                </td>
            </tr>
        ))
        return (
            <div className={'home'}>
                <div className="dot grid">
                    <div className="row">
                        <div className="column-2">
                            <div className="dot list com-list">
                                {
                                    this.state.companyList.map((item, index) => (
                                        <div className={`com-li item ${this.state.active==item.id?"active":''}`} onClick={this.selectCom.bind(this,item)}>
                                            <div className="content">{item.name}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={'white-con'}></div>
                            <div className={'next-con'}>
                                <ul className="dot  list">
                                    {
                                        this.state.secondItem.map((item, index) => (
                                            <div>
                                                <li className="item cursor-li">
                                                    <div className={`content sec-tle ${this.state.activeIndex==item.id?"activeIndex":''}`} onClick={this.selectSec.bind(this,item)}>{item.name}</div>
                                                    <ul className={`list item hidden ${this.state.activeIndex==item.id?"show":''}`}>
                                                        {
                                                            item.children.map((v, i) => (
                                                                <li className="item third-item cursor-li">
                                                                    <div className={`content third-tle ${this.state.thirdId==v.id?"thirdId":''}`} onClick={this.selectThird.bind(this,v)}>{v.name}</div>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </li>
                                            </div>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="column-14">
                            <div className="dot card">
                                <table className="dot table">
                                    <thead>
                                    <tr>
                                        <th>编号</th><th>姓名</th><th>Email</th><th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tableDom}

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const RootPage = props => {
    return (
        <div className={CN('root-page fluid')}>
            <MobileContainer></MobileContainer>
        </div>
    );
}

const ContentPage = props => {
    return (
        <div className={CN('container grid main-page')}>
             <aside className={CN('column-3 main-aside')}>
                 {asideLinks()}
             </aside>
             <article className="column column-13 main-content">
                <Route exact path="/component" component={BasicPage}></Route>
                <Route path="/start" component={StartPage}></Route>
                <Route path="/theme" component={ThemePage}></Route>
                <Route path="/install" component={InstallPage}></Route>
                <Route path="/component/button" component={ButtonPage}></Route>
                <Route path="/component/calendar" component={CalendarPage}></Route>
                <Route path="/component/carousel" component={CarouselPage}></Route>
                <Route path="/component/checkbox" component={CheckBoxPage}></Route>
                <Route path="/component/checkboxgroup" component={CheckBoxGroupPage}></Route>
                <Route path="/component/comment" component={CommentPage}></Route>
                <Route path="/component/confirmbox" component={ConfirmBoxPage}></Route>
                <Route path="/component/datepicker" component={DatePickerPage}></Route>
                <Route path="/component/datetimepicker" component={DateTimePickerPage}></Route>
                <Route path="/component/dropdown" component={DropDownPage}></Route>
                <Route path="/component/form" component={FormPage}></Route>
                <Route path="/component/validator" component={ValidatorPage}></Route>
                <Route path="/component/grid" component={GridPage}></Route>
                <Route path="/component/menu" component={MenuPage}></Route>
                <Route path="/component/toast" component={ToastPage}></Route>
                <Route path="/component/modal" component={ModalPage}></Route>
                <Route path="/component/notice" component={NoticePage}></Route>
                <Route path="/component/pagination" component={PaginationPage}></Route>
                <Route path="/component/pin" component={PinPage}></Route>
                <Route path="/component/panel" component={PanelPage}></Route>
                <Route path="/component/progress" component={ProgressPage}></Route>
                <Route path="/component/radio" component={RadioPage}></Route>
                <Route path="/component/radiogroup" component={RadioGroupPage}></Route>
                <Route path="/component/slidemenu" component={SlideMenuPage}></Route>
                <Route path="/component/tab" component={TabPage}></Route>
                <Route path="/component/timeinput" component={TimeInputPage}></Route>
                <Route path="/component/timepicker" component={TimePickerPage}></Route>
                <Route path="/component/tooltip" component={TooltipPage}></Route>
                <Route path="/component/card" component={CardPage}></Route>
                <Route path="/component/crumb" component={CrumbPage}></Route>
                <Route path="/component/icon" component={IconPage}></Route>
                <Route path="/component/image" component={ImagePage}></Route>
                <Route path="/component/input" component={InputPage}></Route>
                <Route path="/component/item" component={ItemPage}></Route>
                <Route path="/component/label" component={LabelPage}></Route>
                <Route path="/component/loader" component={LoaderPage}></Route>
                <Route path="/component/other" component={OtherPage}></Route>
                <Route path="/component/table" component={TablePage}></Route>
                <Route path="/component/text" component={TextPage}></Route>
                <Route path="/component/list" component={ListPage}></Route>
                <Route path="/component/input-number" component={InputNumberPage}></Route>
                <Route path="/temp" component={TempPage}></Route>
             </article>
        </div>
    )
}


const BaseComponent = () => {
    return (
        <Router>
            <article>
               {/* <Header/>*/}
                <Switch>
                    <Route exact path="/" component={RootPage}></Route>
                    <Route path="/component" component={ContentPage}></Route>
                    <Route path="/start" component={ContentPage}></Route>
                    <Route path="/theme" component={ContentPage}></Route>
                    <Route path="/install" component={ContentPage}></Route>
                    <Route path="/temp" component={ContentPage}></Route>
                    <Route component={RootPage}></Route>
                </Switch>
               {/* <Footer/>*/}
            </article>
        </Router>
    )
}


export default BaseComponent
