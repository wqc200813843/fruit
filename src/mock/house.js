export default {
  getHouseList: config => {
    var condition = JSON.parse(config.body)
    var data = []
    for (let i = 0, length = condition.pageSize; i < length; i++) {
      data.push({
        uuid: '321321321',
        houseNum: '101',
        houseName: '1幢1单元101',
        houseUseFor: '1',
        houseUseForStr: '自住'
      })
    }
    return {
      data: {
        pageSize: condition.pageSize,
        currentPage: 1,
        total: 50,
        tableData: data
      },
      success: true,
      msg: 'success'
    }
  }
}
