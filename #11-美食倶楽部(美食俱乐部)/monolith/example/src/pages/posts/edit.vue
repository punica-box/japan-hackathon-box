<style lang='scss'>
.header-control {
  text-align: right;
  margin: 0 0 2rem;
}
.markdown-body {
  min-height: calc(100vh - 300px) !important;
}
</style>


<template>
  <div class="edit">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/posts' }">記事一覧</el-breadcrumb-item>
        <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="edit-header">
        <div class="header-control">
          <el-button @click='updatePost' type='primary'>保存</el-button>
        </div>
        <el-form>
          <el-form-item>
            <el-input placeholder="title" v-model='title'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <mavon-editor v-model='body' language='en'></mavon-editor>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    this.title = this.post.title
    this.body = this.post.body
  },
  computed: {
    postId() {
      return this.$route.params.id
    },
    post() {
      const _post = this.$store.getters.findPost(this.postId)
      if (!_post) {
        return { title: '', body: '' }
      }
      return _post
    }
  },
  data() {
    return {
      title: '',
      body: '',
    }
  },
  methods: {
    async updatePost() {
      const post = this.post
      post.title = this.title
      post.body = this.body

      try {
        this.$store.dispatch('updatePost', post)

        this.$message.info('更新しました')
      } catch (e) {
        console.error(e)
        this.$message.error('失敗')
      }
    }
  }
}
</script>

