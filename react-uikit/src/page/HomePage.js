import React, { Component } from 'react';
import Hightlight from "react-highlight";
import {NS, COLORS, LARGE_VIEW, SMALL_VIEW, MOBILE_VIEW, TABLET_VIEW} from '../constant';
import {CN, TitleBlock} from '../util/tools';



export class HomePage extends Component {
    render() {
        return (
            <div>
                <div className="dot grid">
                    <div className="row">
                        <div className="column-2">
                            <div className="dot list">
                                <div className="item">
                                    <div className="content">上海轩田</div>
                                </div>
                                <div className="item">
                                    <div className="content">杭州轩田</div>
                                </div>
                            </div>
                        </div>
                        <div className="column-14">
                            11111
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
