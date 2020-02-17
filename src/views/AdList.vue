<template>
    <div>
        <h1>廣告位列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="230">
            </el-table-column>
            <!--<el-table-column prop="parent.name" label="上級分類">-->
            <!--</el-table-column>-->
            <el-table-column prop="name" label="分類名稱">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/ads/edit/${scope.row._id}`)" type="primary" size="mini">
                        编辑
                    </el-button>
                    <el-button @click="handleDelete(scope.row)" type="danger" size="mini">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "AdList",
        data() {
            return {
                items: []
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('rest/ads')
                this.items = res.data
            },
            async handleDelete(row) {
                let confirmResult = await this.$confirm('此操作将永久删除该分類, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                if (confirmResult === 'confirm') {
                    let res = await this.$http.delete(`rest/ads/${row._id}`)
                    if (res.data.success) {
                        this.$message({
                            type: 'success',
                            message: '成功删除'
                        });
                    }
                    this.fetch()
                }
            }
        },
        created() {
            this.fetch()
        }
    }
</script>

<style scoped>

</style>
