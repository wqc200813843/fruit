<template>
  <div class="org-manager">
    <org-tree-view class="org-view-tree"></org-tree-view>
    <div class="tree-view-container flex">
      <div class="operation pb10 clearfix"><!-- 操作栏 -->
        <el-button type="primary" @click="orgEdit">添加</el-button>
        <org-edit ref="orgEdit"></org-edit>
        <el-button @click="orgUpload">导入</el-button>
        <upload title="组织导入" action="https://jsonplaceholder.typicode.com/posts/" downloadUrl="https://www.baidu.com" tips="请选择EXCEL文件！" ref='orgUpload'></upload>
        <el-button>导出</el-button>
        <el-button type="danger" @click="orgDel({})">批量删除</el-button>
      </div>
      <div class="org-list"><!-- 带分页表格 -->
        <pager-table
        ref='pagerTable'
        :pageSize="searchCondition.pageSize"
        :currentPage="searchCondition.currentPage"
        :total="searchCondition.total"
        hasSelect
        :tableData="orgList">
          <template slot="table-column">
            <el-table-column
              label="组织名称"
              prop="name"
              width="80">
            </el-table-column>
            <el-table-column
              label="上级组织名称"
              prop="parentName">
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createTime"
              width="160">
            </el-table-column>
            <el-table-column
              label="创建人"
              prop="creater"
              width="100">
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
import OrgTreeView from './OrgTreeView'
import PagerTable from '../../components/PagerTable'
import OrgEdit from './OrgEdit'
import Upload from '../../components/Upload'
export default {
  data () {
    return {
      searchCondition: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      orgList: [
        {
          id: '321321321',
          name: '1单元',
          parentName: '1幢',
          createTime: '2017-12-06 20:02:20',
          creater: 'wangqichao',
          memo: '1幢1单元'
        }
      ]
    }
  },
  components: {
    OrgTreeView,
    PagerTable,
    OrgEdit,
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
      orgInfoTmp.createTime && (orgInfoTmp.time = new Date(orgInfoTmp.time))
      this.$refs['orgEdit'].orgEdit(orgInfoTmp)
    },
    /**
     * @description 组织删除
     *
     * @param {Object} orgInfo @default {} 组织信息
     */
    orgDel: function (orgInfo = '') {
      if (!orgInfo) return
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
    orgUpload: function () {
      this.$refs['orgUpload'].openDialog()
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
