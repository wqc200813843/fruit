<template>
  <div class="org-manager">
    <org-house-tree-view class="org-view-tree"></org-house-tree-view>
    <div class="tree-view-container flex">
      <div class="operation pb10 clearfix"><!-- 操作栏 -->
        <el-button type="primary" @click="orgEdit">添加</el-button>
        <!-- <org-edit ref="orgEdit"></org-edit> -->
        <el-button @click="orgUpload">导入</el-button>
        <upload title="组织导入" action="https://jsonplaceholder.typicode.com/posts/" downloadUrl="https://www.baidu.com" tips="请选择EXCEL文件！" ref='orgUpload'></upload>
        <el-button>导出</el-button>
        <el-button type="danger" @click="delBatchOrg">批量删除</el-button>
      </div>
      <div class="org-list"><!-- 带分页表格 -->
        <pager-table
        ref="pagerTable"
        :fetch="search"
        hasSelect>
          <template slot="table-column">
            <el-table-column
              label="组织名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="上级组织名称"
              prop="orgParentName">
            </el-table-column>
            <el-table-column
              label="描述"
              prop="memo">
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                @click="orgEdit(scope.row)"
                size="mini">
                编辑</el-button>
                <el-button
                @click="orgDel(scope.row)"
                size="mini"
                type="danger">
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
// import OrgEdit from './OrgEdit'
import Upload from '../../components/Upload'
import {getOrgList} from '@/api/orgManager'
export default {
  data () {
    return {
      orgUuid: null
    }
  },
  components: {
    OrgHouseTreeView,
    PagerTable,
    // OrgEdit,
    Upload
  },
  methods: {
    /**
     * @description 开始组织添加/编辑
     *
     * @param {Object} orgInfo @default {} 组织信息
     */
    orgEdit: function (orgInfo = {}) {
      const orgInfoTmp = Object.assign({}, orgInfo)
      this.$refs['orgEdit'].orgEdit(orgInfoTmp)
    },
    /**
     * @description 组织删除
     *
     * @param {Object} orgInfo @default {} 组织信息
     */
    orgDel: function (orgInfo = {}) {
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
     * @description 组织批量删除
     *
     * @param {Array} orgList @default [] 组织信息
     */
    delBatchOrg: function () {
      const orgList = this.$refs.pagerTable.getSelectData()
      let str = ''
      if (orgList.length <= 0) {
        this.$message({
          message: '请至少选择一项！',
          type: 'warning'
        })
        return
      }
      for (var i = 0, length = orgList.length; i < length; i++) {
        if (orgList[i].name && i < 3) {
          str += orgList[i].name
          if (i < length - 1 && i < 2) {
            str += ','
          }
        }
      }
      str = orgList.length > 3 ? (str + '等') : str
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
    orgUpload: function () {
      this.$refs['orgUpload'].openDialog()
    },
    search: function (options) {
      let condition = options || {}
      condition.orgUuid = this.orgUuid
      return getOrgList(condition)
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
