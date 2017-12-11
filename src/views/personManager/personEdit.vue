<template>
    <el-dialog :visible.sync="dialogFormVisible" width="880px">
        <div slot="title">
            <span class="pull-left pl10">{{form.id?'人员编辑':'人员新增'}}</span>
        </div>
        <el-form :model="form" label-width="100px" :rules="rules">
            <el-row>
                <el-col :span="16">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="人员姓名" prop="name">
                                <el-input v-model="form.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item required label="性别类型">
                                <el-select v-model="form.sex" placeholder="请选择性别">
                                    <el-option v-for="item in list.sex" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item required label="证件类型">
                                <el-select v-model="form.idenType" placeholder="请选择证件类型">
                                    <el-option v-for="item in list.idenType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="民族">
                                <el-select clearable v-model="form.nation" placeholder="请选择民族">
                                    <el-option v-for="item in list.nation" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="电话" prop="phone">
                                <el-input v-model="form.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="单位" prop="company">
                                <el-input v-model="form.company"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item required label="人员类型">
                                <el-select v-model="form.userType" placeholder="请选择人员类型">
                                    <el-option v-for="item in list.userType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="生日">
                                <el-date-picker style="width:auto" v-model="form.birth" align="right" type="date" :editable="false" placeholder="选择生日" format="yyyy年MM月dd日" :picker-options="birthPickerOption">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="证件号码" prop="idenNum">
                                <el-input v-model="form.idenNum"></el-input>
                            </el-form-item>
                            <el-form-item label="籍贯">
                                <el-select clearable v-model="form.origin" placeholder="请选择籍贯">
                                    <el-option v-for="item in list.origin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="邮件" prop="email">
                                <el-input v-model="form.email"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-popover ref="housePopover" placement="top-end" width="460" trigger="click">
                            <div class="house-select-popover">
                                <el-tree :data="houseSelectData" :props="houseSelectProps" @node-click="houseSelectClick"></el-tree>
                            </div>
                        </el-popover>
                        <el-form-item label="入住房屋">
                            <el-input :offset="23" v-model="form.houseName" readonly v-popover:housePopover></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input resize="none" type="textarea" v-model="form.memo"></el-input>
                        </el-form-item>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <async-img width=250 height=175 :src="form.facePic"></async-img>
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
import AsyncImg from '../../components/AsyncImg'
export default {
    components: {
        AsyncImg
    },
    data () {
        return {
            houseSelectData: [{
                label: '根节点',
                children: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }]
            }],
            houseSelectProps: {
                children: 'children',
                label: 'label'
            },
            form: {
                id: null,
                name: '',
                userType: 1,
                sex: 1,
                idenType: 1,
                birth: null,
                idenNum: '',
                nation: '',
                origin: '',
                phone: '',
                email: '',
                company: '',
                facePic: '/src/assets/img/defaultPicture.png'
            },
            dialogFormVisible: false,
            list: {
                userType: [
                    {
                        id: 1,
                        name: '业主'
                    },
                    {
                        id: 2,
                        name: '租户'
                    }
                ],
                sex: [
                    {
                        id: 1,
                        name: '男'
                    },
                    {
                        id: 2,
                        name: '女'
                    }
                ],
                idenType: [
                    {
                        id: 1,
                        name: '身份证'
                    },
                    {
                        id: 2,
                        name: '护照'
                    }
                ],
                nation: [
                    {
                        id: 1,
                        name: '汉族'
                    },
                    {
                        id: 2,
                        name: '藏族'
                    }
                ],
                origin: [
                    {
                        id: 1,
                        name: '浙江'
                    },
                    {
                        id: 2,
                        name: '江苏'
                    }
                ]
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                idenNum: [
                    { required: true, message: '请输入证件号码', trigger: 'blur' }
                ]
            },
            birthPickerOption: {
                disabledDate (time) {
                    return time.getTime() > Date.now()
                }
            }
        }
    },
    methods: {
        personEdit: function (personInfo) {
            this.dialogFormVisible = true
        },
        save: function () {
            this.dialogFormVisible = false
        },
        cancel: function () {
            this.dialogFormVisible = false
        },
        houseSelectClick: function (data) {
        }
    }
}
</script>
<style scoped>
.house-select-popover {
  height: 150px;
  overflow: auto;
}
</style>


