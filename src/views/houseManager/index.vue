<template>
    <div class="org-manager">
        <org-house-tree-view class="org-view-tree"></org-house-tree-view>
        <div class="tree-view-container flex">
            <div class="operation pb10 clearfix">
                <!-- 操作栏 -->
                <el-button type="primary" @click="houseEdit">添加</el-button>
                <house-edit ref="houseEdit"></house-edit>
                <el-button @click="houseUpload">导入</el-button>
                <upload title="房屋导入" action="https://jsonplaceholder.typicode.com/posts/" downloadUrl="https://www.baidu.com" tips="请选择EXCEL文件！" ref='houseUpload'></upload>
                <el-button>导出</el-button>
                <el-button type="danger" @click="delBatchHouse">批量删除</el-button>
            </div>
            <div class="org-list">
                <!-- 带分页表格 -->
                <pager-table ref="pagerTable" :fetch="search" hasSelect>
                    <template slot="table-column">
                        <el-table-column label="房屋号" prop="houseNum">
                        </el-table-column>
                        <el-table-column label="房屋名称" prop="houseName">
                        </el-table-column>
                        <el-table-column label="房屋用途" prop="houseUseForStr">
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button @click="houseEdit(scope.row)" size="mini">
                                    编辑</el-button>
                                <el-button @click="delHouse(scope.row)" size="mini" type="danger">
                                    删除</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </pager-table>
            </div>
        </div>
    </div>
</template>
<script>
import OrgHouseTreeView from './OrgHouseTreeView'
import PagerTable from '../../components/PagerTable'
import HouseEdit from './HouseEdit'
import Upload from '../../components/Upload'
import { getHouseList } from '@/api/houseManager'
export default {
    data () {
        return {
            orgUuid: null
        }
    },
    components: {
        OrgHouseTreeView,
        PagerTable,
        HouseEdit,
        Upload
    },
    methods: {
        /**
         * @description 开始房屋添加/编辑
         *
         * @param {Object} houseInfo @default {} 房屋信息
         */
        houseEdit: function (houseInfo = {}) {
            const houseInfoTmp = Object.assign({}, houseInfo)
            this.$refs['houseEdit'].orgEdit(houseInfoTmp)
        },
        /**
         * @description 房屋删除
         *
         * @param {Object} houseInfo @default {} 房屋信息
         */
        delHouse: function (houseInfo = {}) {
            this.$confirm('确定要刪除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$message({
                    message: '刪除成功',
                    type: 'warning'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        /**
         * @description 房屋批量删除
         *
         * @param {Array} houseInfo @default [] 房屋信息
         */
        delBatchHouse: function () {
            const houseInfo = this.$refs.pagerTable.getSelectData()
            let str = ''
            if (houseInfo.length <= 0) {
                this.$message({
                    message: '请至少选择一项！',
                    type: 'warning'
                })
                return
            }
            for (var i = 0, length = houseInfo.length; i < length; i++) {
                if (houseInfo[i].houseName && i < 3) {
                    str += houseInfo[i].houseName
                    if (i < length - 1 && i < 2) {
                        str += ','
                    }
                }
            }
            str = houseInfo.length > 3 ? (str + '等') : str
            this.$confirm('确定要刪除' + str + '的组织信息吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$message({
                    message: '刪除成功',
                    type: 'warning'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        houseUpload: function () {
            this.$refs['houseUpload'].openDialog()
        },
        search: function (options) {
            let condition = options || {}
            condition.orgUuid = this.orgUuid
            return getHouseList(condition)
        }
    }
}
</script>
<style scoped>
.org-list {
    flex: 1;
    position: relative;
}
</style>
