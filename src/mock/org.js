export default {
  getOrgList: config => {
    debugger
    var condition = JSON.parse(config.body)
    var data = []
    for (let i = 0, length = condition.pageSize; i < length; i++) {
      data.push({
        uuid: '321321321',
        name: '1单元',
        orgParentUuid: '24432423423',
        orgParentName: '1幢',
        memo: '1幢1单元'
      })
    }
    return {
      data: {
        pageSize: condition.pageSize,
        currentPage: 1,
        total: 51,
        tableData: data
      },
      success: true,
      msg: 'success'
    }
  }
}
