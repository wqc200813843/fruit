<template>
  <div class="taskManager">
    <div class="operation pb10 clearfix"><!-- 操作栏 -->
      <el-button type="primary" @click="taskEdit">任务添加</el-button>
      <task-add ref="taskEdit"></task-add>
      <el-button type="danger">批量删除</el-button>
    </div>
    <div class="task-list"><!-- 带分页表格 -->
        <pager-table
        :pageSize="searchCondition.pageSize"
        :currentPage="searchCondition.currentPage"
        :total="searchCondition.total"
        hasSelect
        :tableData="personList">
          <template slot="table-column">
            <el-table-column
              label="姓名"
              prop="name"
              width="80">
            </el-table-column>
            <el-table-column
              label="人员类型"
              prop="personType"
              width="80">
            </el-table-column>
            <el-table-column
              label="性别"
              prop="sex"
              width="80">
            </el-table-column>
            <el-table-column
              label="年龄"
              prop="age"
              width="80">
            </el-table-column>
            <el-table-column
              label="证件类型"
              prop="idCardType"
              width="80">
            </el-table-column>
            <el-table-column
              prop="idCardNumber"
              show-overflow-tooltip
              label="证件号码">
            </el-table-column>
            <el-table-column
              prop="houseAddress"
              show-overflow-tooltip
              label="房屋地址">
            </el-table-column>
            <el-table-column
              prop="phone"
              show-overflow-tooltip
              label="电话号码">
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini">
                  编辑</el-button>
                <el-button
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
      personList: [
        {
          name: '周程',
          personType: '业主',
          sex: '男',
          age: '25',
          idCardType: '身份证',
          idCardNumber: '339005199205954234543543543543543534543543543543543534543',
          houseAddress: 'xx小区1幢1单元101',
          phone: '15105857130'
        }
      ]
    }
  },
  components: {
    PagerTable,
    taskAdd
  },
  methods: {
    taskEdit: function (taskInfo) {
      this.$refs.taskEdit.taskEdit(taskInfo)
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


