<template>
    <div>
        <h1>{{id?'編輯':'新建'}}管理員</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="用戶名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密碼">
                <el-input type="password" v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "AdminUserEdit",
        props:{
            id:{}
        },
        data() {
            return {
                model: {
                    username: "",
                    password:""
                },
            }
        },
        methods: {
            async save() {
                let res
                if(this.id){
                    res = await this.$http.put(`rest/admin_users/${this.id}`,this.model)
                }else{
                    res = await this.$http.post('rest/admin_users', this.model)
                }

                this.$router.push('/admin_users/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                const res=await this.$http.get(`rest/admin_users/${this.id}`)
                this.model=res.data
            },

        },
        created(){
            this.id&&this.fetch()
        }
    }
</script>

<style scoped>

</style>
