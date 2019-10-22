import React, { Component } from 'react';
import {CN, TitleBlock} from '../util/tools';
import {Carousel} from '../component';
import CodeView from './CodeView';

const src = ['ambition-morty', 'awkward-morty', 'despise', 'pride-morty', 'surprise-morty'];
const prefix = 'https://raw.githubusercontent.com/jerryshew/design/master/png';
const getImgs = function(){
    return src.map(i => {
        return (
            <img key={i} src={`${prefix}/${i}.png`} style={{'width': '100%'}}/>
        )
    })
};

const imgNodes = getImgs();

export class CarouselPage extends Component {
    render() {
        return (
            <section>
                {TitleBlock('跑马灯')}
                <br/>

                <h4>默认跑马灯</h4>
                <CodeView component={<Carousel>{imgNodes}</Carousel>}>
{
`<Carousel>
    <img src="../img0.png" key="0" />
    <img src="../img1.png" key="1" />
    <img src="../img2.png" key="2" />
    ...
</Carousel>
`}                    
                </CodeView>

                <h4>自动播放跑马灯</h4>
                <CodeView component={<Carousel autoPlay={true} delay={2000} >{imgNodes}</Carousel>}>
{
`<Carousel autoPlay={true} delay={2000}>
    <img src="../img0.png" key="0" />
    <img src="../img1.png" key="1" />
    <img src="../img2.png" key="2" />
    ...
</Carousel>
`}                    
                </CodeView>

                <h4>带左右切换的跑马灯</h4>
                <CodeView component={<Carousel showArrow={true} >{imgNodes}</Carousel>}>
{
`<Carousel showArrow={true}>
    <img src="../img0.png" key="0" />
    <img src="../img1.png" key="1" />
    <img src="../img2.png" key="2" />
    ...
</Carousel>
`}                    
                </CodeView>

                <h4>自定义切换按钮</h4>
                <CodeView component={
                    <Carousel prev={<i className="dot icon">chevron_left</i>} 
                        next={<i className="dot icon">chevron_right</i>}  showArrow={true} >
                        {imgNodes}
                    </Carousel>}>
{
`<Carousel showArrow={true} 
    prev={<i className="dot icon">chevron_left</i>} 
    next={<i className="dot icon">chevron_right</i>}>
    <img src="../img0.png" key="0" />
    <img src="../img1.png" key="1" />
    <img src="../img2.png" key="2" />
    ...
</Carousel>
`}                    
                </CodeView>
                <br/>

                <h4>属性</h4>
                <table className="dot table">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>描述</th>
                            <th>类型</th>
                            <th>默认值</th>
                            <th>Required</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>autoPlay</td>
                            <td>是否自动播放</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>delay</td>
                            <td>自动播放延迟(毫秒)</td>
                            <td>Number</td>
                            <td>5000</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>showArrow</td>
                            <td>是否显示切换按钮</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>prev</td>
                            <td>左箭头</td>
                            <td>jsx</td>
                            <td>{`<span>prev</span>`}</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>next</td>
                            <td>右箭头</td>
                            <td>jsx</td>
                            <td>{`<span>next</span>`}</td>
                            <td>否</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        );
    }
}
