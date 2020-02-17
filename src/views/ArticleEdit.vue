<template>
    <div>
        <h1>{{id?'編輯':'新建'}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所屬分類">
                <el-select v-model="model.categories" multiple>
                    <el-option v-for="option in categories" :key="option._id" :label="option.name"
                               :value="option._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="標題">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="內容">
                <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {VueEditor} from "vue2-editor";

    export default {
        name: "ArticleEdit",
        props: {
            id: {}
        },
        components: {
            VueEditor
        },
        data() {
            return {
                model: {
                    title: "",
                    categories: []
                },
                categories: []
            }
        },
        methods: {
            async save() {
                let res
                if (this.id) {
                    res = await this.$http.put(`rest/articles/${this.id}`, this.model)
                } else {
                    res = await this.$http.post('rest/articles', this.model)
                }

                this.$router.push('/articles/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            async fetch() {
                const res = await this.$http.get(`rest/articles/${this.id}`)
                this.model = res.data
            },
            async fetchCategories() {
                const res = await this.$http.get('rest/categories')
                this.categories = res.data
            },
            async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
                // An example of using FormData
                // NOTE: Your key could be different such as:
                // formData.append('file', file)
                let formData = new FormData();
                formData.append("file", file);

                let res=await this.$http.post('/upload', formData)

                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader()

            }
        },
        created() {
            this.id && this.fetch()
            this.fetchCategories()
        }
    }
</script>

<style scoped>

</style>
