import Mock from 'mockjs'
import orgAPI from './org'

Mock.setup({
  timeout: '350-600'
})

Mock.mock(/\/org\/list/, 'get', orgAPI.getOrgList)

export default Mock
