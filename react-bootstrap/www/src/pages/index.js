import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Toast from 'react-bootstrap/Toast'
import Jumbotron from 'react-bootstrap/Jumbotron';
import styled from 'astroturf';
import pkg from '../../../package.json';
import Axios from "axios";
import {AxiosRequestConfig} from "./utilities/public.config";

import withLayout from '../withLayout';
import './index.css'

const MastHead = styled(Jumbotron)`
  @import '../css/theme';

  background-color: $dark;
  padding: 0;
  color: white;
  padding-bottom: 0.5rem;
`;

const Content = styled('div')`
  composes: px-4 from global;

  background-image: url('../assets/logo-subtle.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 450px;
  margin: 0 auto;
  max-width: 800px;

  @media (max-width: 800px) {
    padding: 0 40px;
    text-align: center;
  }
`;

const Heading = styled('h1')`
  @import '../css/theme';

  color: $brand;
  font-weight: bold;
  font-size: 3.2rem;
  margin: 2rem 0;
`;

const SubHeading = styled('p')`
  composes: lead from global;

  line-height: 2;
  font-size: 1.6rem;
`;

const BrandButton = styled(Button)`
  @import '../css/theme';

  &:global(.btn-brand) {
    @include button-outline-variant($brand, $dark);
  }
`;

const FeatureCard = styled(Col).attrs({ md: 4 })`
  @import '../css/theme';

  composes: px-4 py-3 from global;
  font-weight: 400;
  line-height: 1.6;

  & h2 {
    font-size: 1.6rem;
    color: $subtle;
    font-weight: 300;
    margin-bottom: 0.6rem;
  }
`;

const ButtonToolbar = styled('div')`
  @import '../css/theme';

  @include media-breakpoint-down(sm) {
    margin: -1rem;

    & > * {
      width: 100%;
      max-width: 300px;
      margin: 1rem;
    }
  }
`;

export default withLayout(
  class HomePage extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        companyList:[{id:1,name:"上海轩田1"},{id:2,name:"杭州轩田1"}],
        secondItem: [],
        tableData: [],
        active:1,
        accordionKey:'3',
        show:false,
        del:false,
        list: [1]
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
    selectCom=(v,e)=>{
      console.log(v);
      this.getSection(v)
      this.setState({
        active: v.id
      })
    };
    setShow(v,e) {
      console.log(v)
      this.setState({
        show: v
      })
    }
    setDel(v,e,x){
      const arrs= this.state.tableData;
      arrs.splice(e,1);
      this.setState({
        del: v,
        tableData:arrs
      })
    }
    componentWillMount(){
      this.csh();
    }

    render() {
      console.log(this.state)
      let comDom = this.state.companyList.map((item, index) => (
        <ListGroup.Item as="li"  className={`com-li ${this.state.active===item.id?"active":''}`} onClick={this.selectCom.bind(this,item)} key={item.id}>
          {item.name}
        </ListGroup.Item>
      ))
      let secDom = this.state.secondItem.map((item, index) => (
        <Card key={item.id}>
          <Accordion.Toggle as={Card.Header} eventKey={item.id + ""} className={`${this.state.accordionKey=== item.id+''?"activeSec":''}`} onClick={this.getEmp.bind(this,item)}>
            {item.name}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={item.id + ''}>
            <Card.Body>
              <ListGroup as="ul">
                {
                  item.children.map((v,i) =>{
                    return (
                      <ListGroup.Item as="li" className={`${this.state.accordionKey===v.id + ''?"activeSec":''}`}  key={i} onClick={this.getEmp.bind(this,v)}>
                        {v.name}
                      </ListGroup.Item>
                    );
                  })
                }
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))

      let tableDom = this.state.tableData.map((item, index) => (
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>
            <ButtonToolbar>
              <Button variant="primary" size="sm" className="btn-margin" onClick={this.setShow.bind(this,true)}>编辑</Button>
              <Button variant="danger"  size="sm" className="btn-margin" onClick={this.setDel.bind(this,true,index)}>删除</Button>
            </ButtonToolbar>
          </td>
        </tr>
      ))
      return (
        <main id="rb-docs-content">
          {/*<MastHead fluid>
            <Content>
              <Heading>React Bootstrap</Heading>
              <SubHeading>
                The most popular front-end framework
                <br />
                <strong>Rebuilt</strong> for React.
              </SubHeading>
              <ButtonToolbar>
                <BrandButton
                  size="lg"
                  variant="brand"
                  className="mr-3 px-5"
                  href="/getting-started/introduction"
                >
                  Get started
                </BrandButton>
                <Button
                  size="lg"
                  href="/components/alerts"
                  className="px-5"
                  variant="outline-light"
                >
                  Components
                </Button>
              </ButtonToolbar>
              <div className="text-muted mt-3">
                Current version: {pkg.version}
              </div>
            </Content>
          </MastHead>*/}
          <div className="tishi">
            <Toast  onClose={() => this.setState({ show: false })} show={this.state.show} delay={3000} autohide>
              <Toast.Header>
                <strong className="mr-auto">提示</strong>
              </Toast.Header>
              <Toast.Body className='ts-con'>编辑成功</Toast.Body>
            </Toast>
          </div>
          <div className='delts'>
            <Toast  onClose={() => this.setState({ del: false })} show={this.state.del} delay={3000} autohide>
              <Toast.Header>
                <strong className="mr-auto">提示</strong>
              </Toast.Header>
              <Toast.Body className='ts-con'>删除成功</Toast.Body>
            </Toast>
          </div>
          <div >
            <Row className="home-row">
              <Col lg={2}>
                <ListGroup as="ul">
                  {comDom}
                </ListGroup>
                <div style={{"marginTop":"30px"}}>
                  <Accordion defaultActiveKey={this.state.accordionKey}>
                    {secDom}
                  </Accordion>
                </div>
              </Col>
              <Col lg={10}>
                <Table striped bordered hover>
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
                </Table>
              </Col>
            </Row>
          </div>

         {/* <Container>
            <Row>
              <FeatureCard>
                <h2>Rebuilt with React</h2>
                <p>
                  React-Bootstrap replaces the Bootstrap JavaScript. Each
                  component has been built from scratch as a true React
                  component, without unneeded dependencies like jQuery.
                </p>
                <p>
                  As one of the oldest React libraries, React-Bootstrap has
                  evolved and grown alongside React, making it an excellent
                  choice as your UI foundation.
                </p>
              </FeatureCard>

              <FeatureCard>
                <h2>Bootstrap at its core</h2>
                <p>
                  Built with compatibility in mind, we embrace our bootstrap
                  core and strive to be compatible with the world's largest UI
                  ecosystem.
                </p>
                <p>
                  By relying entirely on the Bootstrap stylesheet, React-
                  Bootstrap just works with the thousands of bootstrap themes
                  you already love.
                </p>
                <p />
              </FeatureCard>

              <FeatureCard>
                <h2>Accessible by default</h2>

                <p>
                  The React component model gives us more control over form and
                  function of each component.
                </p>
                <p>
                  Each component is implemented with accessibility in mind. The
                  result is a set of accessible-by-default components, over what
                  is possible from plain Bootstrap.
                </p>
              </FeatureCard>
            </Row>

          </Container>*/}
        </main>
      );
    }
  },
);
