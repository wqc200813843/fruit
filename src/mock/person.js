export default {
    getPersonList: config => {
        var condition = JSON.parse(config.body)
        var data = []
        for (let i = 0, length = condition.pageSize; i < length; i++) {
            data.push({
                uuid: '321321321',
                name: '周程',
                userTypeStr: '业主',
                sexStr: '男',
                idenTypeStr: '身份证',
                idenNum: '339005199212223345',
                houseAddress: '1幢1单元101',
                phone: '15105813720'
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
