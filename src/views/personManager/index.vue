<template>
    <div class="person-manager">
        <org-house-tree-view class="org-view-tree"></org-house-tree-view>
        <div class="tree-view-container flex">
            <div class="operation pb10 clearfix">
                <!-- 操作栏 -->
                <el-button type="primary" @click="personEdit">添加</el-button>
                <person-edit ref="personEdit"></person-edit>
                <el-button @click="personUpload">导入</el-button>
                <upload title="人员导入" action="https://jsonplaceholder.typicode.com/posts/" downloadUrl="https://www.baidu.com" tips="请选择EXCEL文件！" ref='personUpload'></upload>
                <el-button>导出</el-button>
                <el-button type="danger" @click="delBatchPerson">批量删除</el-button>
            </div>
            <div class="person-list">
                <!-- 带分页表格 -->
                <pager-table ref="pagerTable" :fetch="search" hasSelect>
                    <template slot="table-column">
                        <el-table-column label="姓名" prop="name">
                        </el-table-column>
                        <el-table-column label="人员类型" prop="userTypeStr">
                        </el-table-column>
                        <el-table-column label="性别" prop="sexStr">
                        </el-table-column>
                        <el-table-column label="证件类型" prop="idenTypeStr">
                        </el-table-column>
                        <el-table-column label="证件号码" prop="idenNum">
                        </el-table-column>
                        <el-table-column label="房屋地址" prop="houseAddress">
                        </el-table-column>
                        <el-table-column label="电话号码" prop="phone">
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button @click="personEdit(scope.row)" size="mini">
                                    编辑</el-button>
                                <el-button @click="delPerson(scope.row)" size="mini" type="danger">
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
import PersonEdit from './PersonEdit'
import Upload from '../../components/Upload'
import { getPersonList } from '@/api/personManager'
export default {
    data () {
        return {}
    },
    components: {
        OrgHouseTreeView,
        Upload,
        PagerTable,
        PersonEdit
    },
    methods: {
        /**
                 * @description 开始人员添加/编辑
                 *
                 * @param {Object} personInfo @default {} 人员信息
                 */
        personEdit: function (personInfo = {}) {
            const personInfoTmp = Object.assign({}, personInfo)
            this.$refs['personEdit'].personEdit(personInfoTmp)
        },
        /**
         * @description 人员删除
         *
         * @param {Object} personInfo @default {} 人员信息
         */
        delPerson: function (personInfo = {}) {
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
         * @description 人员批量删除
         *
         * @param {Array} personInfo @default [] 人员信息
         */
        delBatchPerson: function () {
            const personInfo = this.$refs.pagerTable.getSelectData()
            let str = ''
            if (personInfo.length <= 0) {
                this.$message({
                    message: '请至少选择一项！',
                    type: 'warning'
                })
                return
            }
            for (var i = 0, length = personInfo.length; i < length; i++) {
                if (personInfo[i].houseName && i < 3) {
                    str += personInfo[i].houseName
                    if (i < length - 1 && i < 2) {
                        str += ','
                    }
                }
            }
            str = personInfo.length > 3 ? (str + '等') : str
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
        personUpload: function () {
            this.$refs['personUpload'].openDialog()
        },
        search: function (options) {
            let condition = options || {}
            condition.orgUuid = this.orgUuid
            return getPersonList(condition)
        }
    }
}
</script>
<style scoped>
.person-list {
  flex: 1;
  position: relative;
}
</style>
