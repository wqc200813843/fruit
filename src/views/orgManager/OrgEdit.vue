<template>
    <el-dialog :visible.sync="dialogFormVisible" width="400px" @open="clearValidate">
        <div slot="title">
            <span class="pull-left pl10">{{form.id?'组织编辑':'组织添加'}}</span>
        </div>
        <el-form ref='form' :model="form" label-width="100px" :rules="rules">
            <el-row>
                <el-col :span="20">
                    <el-form-item label="上级组织" prop="orgParentName">
                        <el-input v-model="form.orgParentName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="组织名称" prop="name">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="memo">
                        <el-input resize="none" type="textarea" :rows="4" placeholder="请输入内容" v-model="form.memo">
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

