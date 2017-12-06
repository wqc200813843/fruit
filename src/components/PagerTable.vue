<template>
  <div class="pager-table">
    <el-table
    :data="tableData"
    stripe
    border
    header-cell-class-name="text-align-center"
    @selection-change="handleSelectionChange"
    style="width: 100%">
      <el-table-column v-if="hasSelect"
        type="selection"
        width="55">
      </el-table-column>
      <slot name="table-column"></slot>
    </el-table>
    <el-pagination
      class="table-pager"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selections: []
    }
  },
  props: {
    tableData: {
      default: [],
      type: Array
    },
    total: {
      default: 0,
      type: Number
    },
    currentPage: {
      default: 1,
      type: Number
    },
    hasSelect: {
      default: false,
      type: Boolean
    },
    pageSize: {
      default: 10,
      type: Number
    }
  },
  methods: {
    /**
     * @description 点击table组件复选框触发
     * @param Array val 所有选中行数据
     */
    handleSelectionChange: function (val) {
      this.selections = val
    },
    /**
     * @description 获取选中数据
     * @returns 当前table组件选中的行数据
     */
    getSelectData: function () {
      return this.selections
    },
    /**
     * @description 分页组件单页总数变化
     * @param Number val 选择的单页总数得值
     */
    sizeChange: function (val) {
      this.$emit('search', {pageSize: val})
    },
    /**
     * @description 分页组件当前页变化
     * @param Number val 选择当前页的值
     */
    currentChange: function (val) {
      this.$emit('search', {currentPage: val})
    }
  }
}
</script>
<style scoped>
.pager-table {
  display: flex;
  flex-flow: column;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.table-pager {
  padding: 0;
  margin-top: 10px;
  text-align: right;
}
</style>


