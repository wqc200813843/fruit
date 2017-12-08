<template>
  <el-dialog :visible.sync="dialogFormVisible" @open="clearValidate" width="600px">
    <div slot="title">
      <span class="pull-left pl10">{{form.code?'房屋编辑':'房屋添加'}}</span>
    </div>
    <el-form ref='form' :model="form" label-width="100px" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item required label="上级组织" prop="orgName">
            <el-input v-model="form.orgParentName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item required label="房屋用途">
            <el-select v-model="form.houseUseFor" placeholder="请选择房屋用途">
              <el-option v-for="item in list.houseUseFor" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房产证编号" prop="houseCertificate">
            <el-input v-model="form.houseCertificate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="房屋面积" prop="buildingArea">
            <el-input v-model="form.buildingArea" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系电话" prop="emergencyPhone">
            <el-input v-model="form.emergencyPhone" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="房屋号" prop="houseNum">
            <el-input v-model="form.houseNum" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="居住人数" prop="residentNum">
            <el-input-number style="width:100px" v-model="form.residentNum" controls-position="right" :min="0" :max="20"></el-input-number>
          </el-form-item>
          <el-form-item label="土地证编号" prop="landCertificate">
            <el-input v-model="form.landCertificate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="楼层" prop="floor">
            <el-input-number style="width:100px" v-model="form.floor" controls-position="right" :min="1" :max="99"></el-input-number>
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
        uuid: null,
        name: '', // 名称
        orgParentUuid: null,
        orgParentName: '',
        memo: ''
      },
      rules: { // Form表单字段验证规则
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        memo: [
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      list: {
        houseUseFor: [
          {
            id: '1',
            name: '自住'
          },
          {
            id: '2',
            name: '出租'
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
    orgEdit: function (taskInfo = {}) {
      this.form.uuid = taskInfo.uuid || null
      this.form.name = taskInfo.name || ''
      this.form.orgParentUuid = taskInfo.orgParentUuid || null
      this.form.orgParentName = taskInfo.orgParentName || ''
      this.form.memo = taskInfo.memo || ''
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

