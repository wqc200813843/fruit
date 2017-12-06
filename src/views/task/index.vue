<template>
  <div class="taskManager">
    <div class="operation pb10 clearfix"><!-- 操作栏 -->
      <el-button type="primary" @click="taskEdit">任务添加</el-button>
      <task-add @add-task="addTask" ref="taskEdit"></task-add>
      <el-button type="danger" @click="mutiDel">批量删除</el-button>
    </div>
    <div class="task-list"><!-- 带分页表格 -->
        <pager-table
        ref="pagerTable"
        :pageSize="searchCondition.pageSize"
        :currentPage="searchCondition.currentPage"
        :total="searchCondition.total"
        hasSelect
        :tableData="taskList">
          <template slot="table-column">
            <el-table-column
              label="名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="类型"
              prop="type"
              width="80">
              <template slot-scope="scope">
                <span v-text="typeComputed(scope)"></span>
              </template>  
            </el-table-column>
            <el-table-column
              label="需时"
              prop="needTime"
              width="80">
            </el-table-column>
            <el-table-column
              label="时限"
              prop="time"
              width="140">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.time }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="完成情况"
              prop="complete"
              width="100">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.complete"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                @click="taskEdit(scope.row)"
                size="mini">
                编辑</el-button>
                <el-button
                @click="delTask(scope.row)"
                size="mini"
                type="danger">
                删除</el-button>
              </template>
            </el-table-column>
          </template>
        </pager-table>
      </div>
  </div>
</template>
<script>
import PagerTable from '../../components/PagerTable'
import taskAdd from './taskAdd'
export default {
  data () {
    return {
      searchCondition: {
        name: '3232',
        personType: '',
        sex: '',
        pageSize: 10,
        currentPage: 1,
        total: 1
      },
      taskList: [
        {
          id: '432423423423',
          name: 'fruit manager v1.0',
          type: '1',
          needTime: 20,
          time: '2017-12-30',
          complete: false,
          content: '1. fruit manager\n2.buyer manager'
        }
      ],
      selections: []
    }
  },
  components: {
    PagerTable,
    taskAdd
  },
  methods: {
    /**
     * @description 开始任务添加/编辑
     *
     * @param {Object} taskInfo @default {} 任务信息
     */
    taskEdit: function (taskInfo = {}) {
      const taskInfoTmp = Object.assign({}, taskInfo)
      taskInfoTmp.time && (taskInfoTmp.time = new Date(taskInfoTmp.time))
      this.$refs.taskEdit.taskEdit(taskInfoTmp)
    },
    typeComputed: function (scope) {
      let type = ''
      switch (scope.row.type) {
        case '1':
          type = '紧急重要'
          break
        case '2':
          type = '不紧急重要'
          break
        case '3':
          type = '紧急不重要'
          break
        case '4':
          type = '不紧急不重要'
          break
        default :
          type = '--'
          break
      }
      return type
    },
    addTask: function (taskInfo = {}) {
      JSON.stringify(taskInfo) !== '{}' && this.taskList.push(taskInfo)
    },
    delTask: function (taskInfo) {
      var INDEX = this.taskList.findIndex(function (value, index, arr) {
        return value.id === taskInfo.id
      })
      if (INDEX >= 0) {
        this.$confirm('确定要刪除<span style="color:#f00">' + taskInfo.name + '</span>吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.taskList.splice(INDEX, 1)
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
      }
    },
    mutiDel: function () {
      var selections = this.$refs.pagerTable.getSelectData()
      if (selections.length) {
        let str = ''
        let ids = []
        for (let [index, elem] of selections.entries()) {
          str += elem.name
          ids.push(elem.id)
          if (index !== selections.length - 1) {
            str += ','
          }
        }
        this.$confirm('确定要刪除<span style="color:#f00">' + str + '</span>吗?', '提示', {
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
      } else {
        this.$message({
          message: '请至少选择一项！',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style scoped>
.taskManager{
  border: 1px solid #dddee1;
  padding:10px;
  display: flex;
  flex-flow: column;
}
.task-list {
  flex: 1;
  position: relative;
}
</style>


