
//测试环境
const groupUrl = '/api'
//接口地址管理

//const groupUrl = 'http://xxx.xxx.xxx'

const url = {
  query:{
    interfaceId:groupUrl + '/employees',
    tips:"获取人员"
  },
  acquireCompanies:{
    interfaceId:groupUrl + '/companies',
    tips:"获取公司"
  },
  acquireDepartment:{
    interfaceId:groupUrl + '/organization/',
    tips:"获取部门"
  },
  acquireEmp:{
    interfaceId:groupUrl + '/organization/',
    tips:"获取人员"
  },
}

export default url
