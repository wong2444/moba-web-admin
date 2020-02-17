<template>
    <div>
        <h1>{{id?'編輯':'新建'}}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <!--<el-form-item label="上級分類">-->
            <!--<el-select v-model="model.parent">-->
            <!--<el-option v-for="option in parents" :key="option._id" :label="option.name" :value="option._id"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-tabs value="skills" type="border-card">
                <el-tab-pane label="基本信息" name="basic">
                    <el-form-item label="名稱">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="頭像">
                        <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :headers="getAuthHeaders()"
                                :show-file-list="false"
                                :on-success="res=>model.avatar=res.url">
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="Banner">
                        <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :headers="getAuthHeaders()"
                                :show-file-list="false"
                                :on-success="res=>model.banner=res.url">
                            <img v-if="model.banner" :src="model.banner" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="稱號">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="職業">
                        <el-select v-model="model.categories" multiple placeholder="请选择">
                            <el-option
                                    v-for="item in categories"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="難度">
                        <el-rate :max="9" v-model="model.scores.difficult" style="margin-top: 0.6rem"
                                 show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate :max="9" v-model="model.scores.skills" style="margin-top: 0.6rem" show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="攻擊">
                        <el-rate :max="9" v-model="model.scores.attack" style="margin-top: 0.6rem" show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate :max="9" v-model="model.scores.survive" style="margin-top: 0.6rem"
                                 show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="順風出裝">
                        <el-select v-model="model.items1.items" multiple placeholder="请选择">
                            <el-option
                                    v-for="item in items1"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="小提示">
                        <el-input type="textarea" v-model="model.items1.tips"></el-input>
                    </el-form-item>
                    <el-form-item label="逆風出裝">
                        <el-select v-model="model.items2.items" multiple placeholder="请选择">
                            <el-option
                                    v-for="item in items2"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="小提示">
                        <el-input type="textarea" v-model="model.items2.tips"></el-input>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="對抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="團戰思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="最佳搭档">-->
                    <!--<el-select v-model="model.partners" multiple placeholder="请选择">-->
                    <!--<el-option-->
                    <!--v-for="item in partners"-->
                    <!--value-key="_id"-->
                    <!--:key="item._id"-->
                    <!--:label="item.name"-->
                    <!--:value="item">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-row type="flex" style="flex-wrap: wrap">-->
                    <!--<el-col :md="12" v-for="(item,i) in model.partners" :key="i">-->
                    <!--<el-form-item :label="'搭档 ' + item.name+ ' 描述'">-->
                    <!--<el-input v-model="item.description" type="textarea"></el-input>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                </el-tab-pane>
                <el-tab-pane label="技能" name="skills">
                    <el-button @click="model.skills.push({})"><i class="el-icon-document-add"></i>&nbsp;添加</el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
                            <el-form-item label="名稱">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="圖標">
                                <el-upload
                                        class="avatar-uploader"
                                        :action="uploadUrl"
                                        :headers="getAuthHeaders()"
                                        :show-file-list="false"
                                        :on-success="(res)=>$set(item,'icon',res.url)">
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="冷卻值">
                                <el-input v-model="item.delay"></el-input>
                            </el-form-item>
                            <el-form-item label="消耗">
                                <el-input v-model="item.cost"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item label="貼士">
                                <el-input type="textarea" v-model="item.tips"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="danger" size="mini" @click="model.skills.splice(i,1)">刪除</el-button>
                            </el-form-item>

                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="搭擋" name="partners">
                    <el-button @click="model.partners.push({})"><i class="el-icon-document-add"></i>&nbsp;添加</el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col :md="12" v-for="(item,i) in model.partners" :key="i">
                            <el-form-item label="名稱">
                                <el-select filterable v-model="item.hero" placeholder="请选择">
                                    <el-option
                                            v-for="hero in heroes"
                                            :key="hero._id"
                                            :label="hero.name"
                                            :value="hero._id">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>


                            <el-form-item>
                                <el-button type="danger" size="mini" @click="model.partners.splice(i,1)">刪除</el-button>
                            </el-form-item>

                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>

            <el-form-item>
                <el-button type="primary" native-type="submit" style="margin-top: 1rem">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "ItemEdit",
        props: {
            id: {}
        },
        data() {
            return {
                model: {
                    name: "",
                    avatar: "",
                    banner: "",
                    title: "",
                    categories: [],
                    scores: {difficult: 0, skills: 0, attack: 0, survive: 0},
                    skills: [],
                    items1: {items: [], tips: ""},
                    items2: {items: [], tips: ""},
                    usageTips: "",
                    battleTips: "",
                    teamTips: "",
                    partners: []
                },
                categories: [],
                items1: [],
                items2: [],
                partners: [],
                heroes: []
            }
        },
        methods: {
            async save() {
                let res
                if (this.id) {
                    res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
                } else {
                    res = await this.$http.post('rest/heroes', this.model)
                }

                this.$router.push('/heroes/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            async fetch() {
                const res = await this.$http.get(`rest/heroes/${this.id}`)
                this.model = Object.assign({}, this.model, res.data)
            },
            async fetchCategories() {
                const res = await this.$http.get(`rest/categories`)
                let result = res.data.filter(item => {
                    if (item.parent && item.parent.name === '英雄分類') {
                        return item
                    }
                })
                this.categories = result
            },
            async fetchItems() {
                const res = await this.$http.get(`rest/items`)
                this.items1 = res.data
                this.items2 = res.data
            },
            async fetchPartners() {
                const res = await this.$http.get(`rest/heroes`)
                this.partners = res.data
            },
            async fetchHeroes() {
                const res = await this.$http.get(`rest/heroes`)
                this.heroes = res.data
            }
            // afterUpload(res) {
            //
            //     this.model.avatar = res.url
            // },

            // async fetchParents() {
            //     const res = await this.$http.get('rest/categories')
            //     this.parents = res.data
            // },
        },
        created() {
            this.fetchCategories()
            this.fetchItems()
            this.fetchPartners()
            this.fetchHeroes()
            this.id && this.fetch()
            // this.fetchParents()
        }
    }
</script>

<style>

</style>
