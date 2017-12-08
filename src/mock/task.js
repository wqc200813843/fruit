export default {
  getTaskList: config => {
    var condition = JSON.parse(config.body)
    var data = []
    for (let i = 0, length = condition.pageSize; i < length; i++) {
      data.push({
        id: '432423423423',
        name: 'fruit manager v1.0',
        type: '1',
        needTime: 20,
        time: '2017-12-30',
        complete: false,
        content: '1. fruit manager\n2.buyer manager'
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
