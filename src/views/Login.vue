<template>
    <div class="login-container">
        <el-card header="請先登錄" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item label="用戶名">
                    <el-input v-model="model.username">

                    </el-input>
                </el-form-item>
                <el-form-item label="密碼">
                    <el-input type="password" v-model="model.password">

                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">
                        登錄
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                model: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            async login() {
                let res = await this.$http.post('/login', this.model)
                localStorage.token = res.data.token
                this.$router.push('/')
                this.$message.success('登錄成功')
            }
        }
    }
</script>

<style scoped>
    .login-card {
        width: 30%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
