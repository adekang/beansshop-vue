<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <!--表格区域  -->
      <tree-table :data="cateList" :columns="columns" :selection-type="false"
                  :expand-type="false" show-index index-text="序号" border>
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:lightgreen"></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>
      </tree-table>
      <!--分页区域-->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [],
      //查询分类数据的条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      //保存总数据条数
      total: 0,
      // 为table指定列的定义
      columns: [
        {label: '分类名称', prop: 'cat_name'},
        //type:'template'(将该列设置为模板列)，template:'isok'(设置该列模板的名称为isok)
        {label: '是否有效', prop: '', type: 'template', template: 'isok'},
        {label: '排序', prop: '', type: 'template', template: 'order'},
        {label: '操作', prop: '', type: 'template', template: 'opt'}
      ]
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const {data: res} = await this.$http.get('categories', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }
      //将数据列表赋值给cateList
      this.cateList = res.data.result
      //保存总数据条数
      this.total = res.data.total
    }
  }
}
</script>

<style lang="scss" scoped>

</style>