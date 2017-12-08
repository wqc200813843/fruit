import Mock from 'mockjs'
import orgAPI from './org'
import taskAPI from './task'

Mock.setup({
  timeout: '350-600'
})

Mock.mock(/\/org\/list/, 'get', orgAPI.getOrgList)
Mock.mock(/\/task\/list/, 'get', taskAPI.getTaskList)

export default Mock
