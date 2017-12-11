<template>
    <div class="tree-container">
        <el-input placeholder="按组织名称查询" prefix-icon="el-icon-search" v-model="searchKey" class="fuzzy-search">
        </el-input>
        <el-tree :data="treeData" :props="defaultProps" :expand-on-click-node="false" :render-content="renderContent"></el-tree>
    </div>
</template>
<script>
export default {
    data () {
        return {
            searchKey: '',
            treeData: [
                {
                    label: '根节点',
                    children: [
                        {
                            label: '一级 1',
                            children: [
                                {
                                    label: '二级 1-1',
                                    children: [
                                        {
                                            label: '三级 1-1-1'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: '一级 2',
                            children: [
                                {
                                    label: '二级 2-1',
                                    children: [
                                        {
                                            label: '三级 2-1-1'
                                        }
                                    ]
                                },
                                {
                                    label: '二级 2-2',
                                    children: [
                                        {
                                            label: '三级 2-2-1'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: '一级 3',
                            children: [
                                {
                                    label: '二级 3-1',
                                    children: [
                                        {
                                            label: '三级 3-1-1'
                                        }
                                    ]
                                },
                                {
                                    label: '二级 3-2',
                                    children: [
                                        {
                                            label: '三级 3-2-1'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        addHouse: function () {
            this.$message({
                message: '添加房屋',
                type: 'success'
            })
        },
        delOrg: function () {
            this.$message({
                message: '删除组织',
                type: 'warning'
            })
        },
        renderContent: function (h, { node, data, store }) {
            return (
                <span>
                    <span style="margin-right:8px">{node.label}</span>
                    <i
                        class="el-icon-plus"
                        title="添加"
                        on-click={() => {
                            this.addHouse()
                        }}
                    />
                    <i class="el-icon-close"
                        on-click={() => {
                            this.delOrg()
                        }}
                    />
                </span>
            )
        }
    }
}
</script>
<style scoped>
.tree-container {
    display: flex;
    flex-flow: column;
}

.el-tree {
    flex: 1;
}

.fuzzy-search {
    margin: 10px;
    width: 178px;
}
</style>


