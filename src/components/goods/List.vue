<template>
  <div>
    <h3>商品列表</h3>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table :data="goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格（元）" prop="goods_price"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间" prop="add_time"></el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" type="primary" icon="el-icon-edit">
            编辑
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //查询参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      //保存商品列表信息
      goodsList: [],
      //总数据条数
      total: 0
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 根据分页获取参数
    async getGoodsList() {
      //   根据分页获取对应的商品列表
      const {data: res} = await this.$http.get('goods', {
        params: this.queryInfo
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败')
      }
      this.goodsList = res.data.goods
      this.total - res.data.total
    }
  }
}
</script>

<style lang="scss" scoped>

</style>