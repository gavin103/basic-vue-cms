<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="12">
          <el-card shadow="hover">
              <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
          </el-card>
      </el-col>
      <el-col :span="12">
          <el-card shadow="hover">
              <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
          </el-card>
      </el-col>
    </el-row>
        <el-card shadow="hover" style="height:500px;">
        <div slot="header" class="clearfix">
            <span>待开发新功能及待修复Bug</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
        </div>
        <el-table :show-header="false" :data="todoList" style="width:100%;">
            <el-table-column width="40">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.status"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <div
                        class="todo-item"
                        :class="{'todo-item-del': scope.row.status}"
                    >{{scope.row.title}}</div>
                </template>
            </el-table-column>
            <el-table-column width="60">
                <template>
                    <i class="el-icon-edit"></i>
                    <i class="el-icon-delete"></i>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>

import Schart from 'vue-schart';
export default {
    name: 'dashboard',
    data() {
        return {
            todoList: [
                {
                    title: '[功能]增加删除功能',
                    status: false
                },
                {
                    title: '[功能]引入JWT鉴权',
                    status: false
                },
                {
                    title: '[功能]侧边栏收缩功能',
                    status: false
                },
                {
                    title: '[功能]用户信息可修改',
                    status: false
                },
                {
                    title: '[功能]用户信息详情页',
                    status: false
                },
                {
                    title: '[功能]TODO 接入数据库',
                    status: false
                },
                {
                    title: '[功能]TODO 接入日志',
                    status: false
                },
                {
                    title: '[Bug]侧边栏边缘有突出部位',
                    status: false
                }
            ],
            options: {
                type: 'bar',
                title: {
                    text: '最近一周各品类销售图'
                },
                xRorate: 25,
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各品类销售趋势图'
                },
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [74, 118, 200, 235, 90]
                    }
                ]
            }
        };
    },
    components: {
        Schart
    },
  }
</script>
<style>
.dashboard .schart {
    width: 100%;
    height: 300px;
}
.dashboard .el-row {
    margin-bottom: 20px;
}
</style>