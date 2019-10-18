/**
 * Created by dell on 2017/6/21.
 */

import moment from 'moment';
import {baseURL} from './common.dev';

import React from 'react';

export const AxiosRequestConfig=(getParams)=> {
    //console.log();
    return {
        withCredentials: true,
        baseURL: baseURL,
        params: getParams?getParams:{},
        headers: {
            "Content-Type": "application/json",
        }
    }
}
/**
 * 将时间戳转换为格式化字符串
 * @param date 时间戳
 * @param format 格式化字符串，如YYYY-MM-DD
 * @param format2 当时间戳为空返回的默认字符串，可以为空
 * @returns string
 */
export const mes_formatDate=(date,format,format2)=>{
    let result = null;
    try {
        if(date)
            result = moment(date).format(format);
        else if(format2)
            result = format2;
    } catch(error) {
        console.error(error);
    } finally {
       return result;
    }
}
/**
 * 将字符串转换为moment类型
 * @param date 时间字符串
 * @param format 格式化字符串，如YYYY-MM-DD
 * @returns moment
 */
export const mes_stringToMoment = (date,format)=> {
    let result = null;
    try {
        if (date)
            result = moment(date, format);
    } catch (error) {
        console.error(error);
    } finally {
        return result;
    }
}
let allBaseProps = {
    get:false,
    data:{}
};


    /**
     * 上移
     * @param list
     * @param id
     * @param fieldName
     * @returns {*}
     */
  export const moveUp=(list,id,fieldName)=>{
        let result = {
            list:list,
            state:0,
            remark:'移动失败'
        };
       try{
           const index = list.findIndex(item=>item.id===id);
           if(index==0){
               result.remark='已经是最顶部了';
           }else if(index<0){
               result.remark='id不存在';
           }else if(index>0){
               let _list = list.slice();
               const _this = _list[index];
               _list[index] = _list[index-1];
               _list[index-1] = _this;
               _list.forEach((item,index)=>{
                   item[fieldName] = index+1;
               })
               result.state = 1;
               result.list = _list;
               result.remark='移动成功';
           }
       }catch(error){
           console.log(error);
       }
        return result;
    }
/**
 * 下移
 * @param list
 * @param id
 * @param fieldName
 */
export const moveDown=(list,id,fieldName)=>{
    let result = {
        list:list,
        state:0,
        remark:'移动失败'
    };
    try{
        const index = list.findIndex(item=>item.id===id);
        if(index===list.length-1){
            result.remark='已经是最底部了';
        }else if(index<0){
            result.remark='id不存在';
        }else if(index>=0){
            let _list = list.slice();
            const _this = _list[index];
            _list[index] = _list[index+1];
            _list[index+1] = _this;
            _list.forEach((item,index)=>{
                item[fieldName] = index+1;
            })
            result.state = 1;
            result.list = _list;
            result.remark='移动成功';
        }
    }catch(error){
        console.log(error);
    }
    return result;
}
/**
 * 移除
 * @param list
 * @param id
 * @param fieldName
 */
export const moveOut=(list,id,fieldName)=>{

    let result = {
        list:list,
        state:0,
        remark:'删除失败'
    };
    try{
        const index = list.findIndex(item=>item.id===id);
        if(index<0) {
            result.remark = 'id不存在';
        }else{
            let _list = list.slice();
            _list.splice(index,1);
            _list.forEach((item,index)=>{
                item[fieldName] = index+1;
            })
            result.state = 1;
            result.list = _list;
            result.remark='删除成功';
        }
    }catch(error){
        console.log(error);
    }
    return result;
}
/**
 * 置顶
 * @param list
 * @param id
 * @param fieldName
 */
export const moveTop=(list,id,fieldName)=>{
    let result = {
        list:list,
        state:0,
        remark:'移动失败'
    };
    try{
        const index = list.findIndex(item=>item.id===id);
        if(index==0){
            result.remark='已经是最顶部了';
        }else if(index<0){
            result.remark='id不存在';
        }else if(index>0){
            let _list = list.slice();
            const _this = _list[index];
            //_list[index] = _list[0];
            //_list[0] = _this;
            _list.splice(index,1);
            _list.splice(0,0,_this);
            _list.forEach((item,index)=>{
                item[fieldName] = index+1;
            })
            result.state = 1;
            result.list = _list;
            result.remark='移动成功';
        }
    }catch(error){
        console.log(error);
    }
    return result;
}
/**
 * 置底
 * @param list
 * @param id
 * @param fieldName
 */
export const moveBottom=(list,id,fieldName)=>{
    let result = {
        list:list,
        state:0,
        remark:'移动失败'
    };
    try{
        const index = list.findIndex(item=>item.id===id);
        if(index===list.length-1){
            result.remark='已经是最底部了';
        }else if(index<0){
            result.remark='id不存在';
        }else if(index>=0){
            let _list = list.slice();
            const _this = _list[index];
            //_list[index] = _list[_list.length-1];
            //_list[_list.length-1] = _this;
            _list.splice(index,1);
            _list.push(_this);
            _list.forEach((item,index)=>{
                item[fieldName] = index+1;
            })
            result.state = 1;
            result.list = _list;
            result.remark='移动成功';
        }
    }catch(error){
        console.log(error);
    }
    return result;
}
