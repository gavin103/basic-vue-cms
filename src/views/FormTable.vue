<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>查询列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="editVisible = true"
                >新增</el-button>
                <el-select v-model="query.category" placeholder="等级" class="handle-select mr10">
                    <el-option label="全部" value=""></el-option>
                    <el-option key="A" label="A类" value="A"></el-option>
                    <el-option key="B" label="B类" value="B"></el-option>
                    <el-option key="C" label="C类" value="C"></el-option>
                </el-select>
                <el-input v-model="query.desc" placeholder="商品描述" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="pn" label="PN"></el-table-column>
                <el-table-column prop="desc" label="描述"></el-table-column>
                <el-table-column label="等级">
                    <template slot-scope="scope">{{scope.row.category}}级</template>
                </el-table-column>
                <el-table-column prop="quatity" label="库存"></el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-tickets"
                            @click="handleShowDetail(scope.$index, scope.row)"
                        >详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="商品编辑器" :visible.sync="editVisible" width="35%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="PN">
                    <el-input v-model="form.pn"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input 
                        type="textarea"
                        :rows="3"
                        placeholder="请输入详情"
                        v-model="form.usage"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input-number v-model="form.quatity"></el-input-number>
                </el-form-item>
                <el-form-item label="等级">
                    <el-radio-group v-model="form.category">
                        <el-radio-button value="A" label="A"></el-radio-button>
                        <el-radio-button value="B" label="B"></el-radio-button>
                        <el-radio-button value="C" label="C"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="维护人">
                    <el-input v-model="form.maintainer"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseEditor">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="商品详情" :visible.sync="detailVisible" width="35%">
            <ul class="detail-list">
                <li><span>PN：</span>{{form.pn}}</li>
                <li><span>描述：</span>{{form.desc}}</li>
                <li><span></span>{{form.usage}}</li>
                <li><span>数量：</span>{{form.quatity}}</li>
                <li><span>等级：</span>{{form.category}}级</li>
                <li><span>维护人：</span>{{form.maintainer}}</li>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
import { getGoodsList, updateGood } from '../api/index';
// const pageSize = 10;
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                category: '',
                desc: '',
                pageIndex: 1,
            },
            tableData: [],
            editVisible: false,
            detailVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            getGoodsList(this.query).then(res => {
                if(res.code===0){
                    const {list,total} = res.data;
                    this.tableData = list
                    this.pageTotal = total
                }
            }).catch(err=>this.$message.error(err));
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        
        _updateGood() {
            const empty = {
                // "pn": "",
                "desc": "",
                "usage": "",
                "quatity": 15,
                "category": "",
                "maintainer": "",
            }
            let type='add'
            if(this.form._id){
                type='edit'
            }
            updateGood({...empty,...this.form},type).then(res=>{
                if(res.code===0){
                    this.editVisible = false;
                    this.form={}
                    this.$message.success('修改成功');
                    this.getData()
                }
            })
        },
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        handleShowDetail(index, row) {
            this.idx = index;
            this.form = row;
            this.detailVisible = true;
        },
        handleCloseEditor(){
            this.idx = -1;
            this.form = {};
            this.editVisible = false;
        },
        // 保存编辑
        saveEdit() {
            this.$set(this.tableData, this.idx, this.form);
            this._updateGood()
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.crumbs{
    margin-bottom: 12px;
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.detail-list li span{
    display: inline-block;
    width: 100px;
}
</style>
