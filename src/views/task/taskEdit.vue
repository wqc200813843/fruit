<template>
  <el-dialog :visible.sync="dialogFormVisible" width="400px" @open="clearValidate">
    <div slot="title">
      <span class="pull-left pl10">{{form.id?'任务编辑':'任务添加'}}</span>
    </div>
    <el-form ref='form' :model="form" label-width="100px" :rules="rules">
      <el-row>
        <el-col :span="20">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item required label="类型">
            <el-select v-model="form.type" placeholder="请选择类型">
              <el-option v-for="item in list.type" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item required label="需时" prop="needTime">
            <el-input-number style="width:100px" v-model="form.needTime" controls-position="right" :min="0" :max="99"></el-input-number>
          </el-form-item>
          <el-form-item label="时限" prop="time">
            <el-date-picker 
              style="width:auto"
              v-model="form.time"
              align="right"
              type="date"
              :editable="false"
              placeholder="选择时限"
              format="yyyy年MM月dd日">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="完成情况" prop="complete">
            <el-switch
              v-model="form.complete"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="完成"
              inactive-text="未完成">
            </el-switch>
          </el-form-item>
          <el-form-item label="任务内容" prop="content">
            <el-input
              resize="none"
              type="textarea"
              :rows="4"
              placeholder="请输入任务内容"
              v-model="form.content">
            </el-input>
          </el-form-item>
        </el-col>
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
      form: { // 表单信息
        id: null,
        name: '', // 名称
        type: '1', // 重要程度
        needTime: 0, // 需时
        time: null, // 时限
        complete: false, // 完成情况
        content: '' // 任务内容
      },
      rules: { // Form表单字段验证规则
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请输入正确的任务时限', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入任务内容', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      list: {
        type: [
          {
            id: '1',
            name: '紧急重要'
          },
          {
            id: '2',
            name: '紧急不重要'
          },
          {
            id: '3',
            name: '不紧急重要'
          },
          {
            id: '4',
            name: '不紧急不重要'
          }
        ]
      }
    }
  },
  methods: {
    /**
     * @description 开始任务添加/编辑
     *
     * @param {Object} taskInfo @default {} 任务信息
     */
    taskEdit: function (taskInfo = {}) {
      this.form.id = taskInfo.id || null
      this.form.name = taskInfo.name || '' // 名称
      this.form.type = taskInfo.type || '1' // 重要程度
      this.form.needTime = taskInfo.needTime || 0 // 需时
      this.form.time = taskInfo.time || null // 时限
      this.form.complete = false // 完成情况
      this.form.content = taskInfo.content || '' // 任务内容
      this.dialogFormVisible = true
    },
    /**
     * @description 保存任务信息
     */
    save: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$message({
            message: '保存任务成功',
            type: 'success'
          })
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: '内容未填写正确',
            type: 'warning'
          })
          return false
        }
      })
    },
    /**
     * @description 关闭任务添加弹出框
     */
    cancel: function () {
      this.$refs['form'].resetFields()
      this.dialogFormVisible = false
    },
    /**
     * @description 打开模态框清除表单验证
     * 表单值初始化时会促使表单验证启动，故在模态框打开时清除表单验证
     */
    clearValidate: function () {
      // 需要模态框打开时clearValidate才会生效
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
      // this.$refs['form'] && this.$refs['form'].clearValidate()
    }
  }
}
</script>
<style scoped>
.el-form-item {
  text-align: left;
}
</style>

