<template>
    <div>
        <h1>{{id?'編輯':'新建'}}廣告位</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名稱">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="model.items.push({})"><i class="el-icon-document-add"></i>&nbsp;添加</el-button>
            </el-form-item>

            <el-row type="flex" style="flex-wrap: wrap">
                <el-col :md="12" v-for="(item,i) in model.items" :key="i">
                    <el-form-item label="廣告圖">
                        <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :headers="getAuthHeaders()"
                                :show-file-list="false"
                                :on-success="(res)=>$set(item,'image',res.url)">
                            <img v-if="item.image" :src="item.image" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="鏈結">
                        <el-input v-model="item.url"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="danger" size="mini" @click="model.items.splice(i,1)">刪除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "AdEdit",
        props: {
            id: {}
        },
        data() {
            return {
                model: {
                    name: "",
                    items: []
                },
            }
        },
        methods: {
            async save() {
                let res
                if (this.id) {
                    res = await this.$http.put(`rest/ads/${this.id}`, this.model)
                } else {
                    res = await this.$http.post('rest/ads', this.model)
                }

                this.$router.push('/ads/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            async fetch() {
                const res = await this.$http.get(`rest/ads/${this.id}`)
                this.model = res.data
            },

        },
        created() {
            this.id && this.fetch()
        }
    }
</script>

<style scoped>

</style>
