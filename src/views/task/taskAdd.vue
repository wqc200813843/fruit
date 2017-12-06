<template>
  <el-dialog :visible.sync="dialogFormVisible">
    <div slot="title">
      <span class="pull-left pl10">{{form.id?'任务编辑':'任务添加'}}</span>
    </div>
    <el-form :model="form" label-width="100px" :rules="rules">
      <el-row>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogFormVisible: false, // 显隐dialog
      form: {}, // 表单信息
      rules: { // Form表单字段验证规则
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * @description 关闭任务添加弹出框
     *
     * @param {Object} taskInfo 任务信息
     */
    taskEdit: function (taskInfo) {
      this.dialogFormVisible = true
    },
    /**
     * @description 保存任务信息
     */
    save: function () {
      this.dialogFormVisible = false
    },
    /**
     * @description 关闭任务添加弹出框
     */
    cancel: function () {
      this.dialogFormVisible = false
    }
  }
}
</script>

