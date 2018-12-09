<style lang='css'>
.button {
  text-align: right;
}
.markdown-body {
  min-height: calc(100vh - 300px) !important;
}
</style>

<style lang='scss' scoped>
.edit-header {
  display: flex;
  justify-content: space-between;
  .el-form {
    flex: 1;
    margin-right: 2rem;
  }
}
</style>


<template>
  <div class="container">
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/posts' }">Post list</el-breadcrumb-item>
        <el-breadcrumb-item>New post</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>New Post</h1>
    </div>
    <div class="editor">
      <div class="edit-header">
        <el-form>
          <el-form-item>
            <el-input placeholder="title" v-model='title'></el-input>
          </el-form-item>
        </el-form>
        <div class="header-control">
          <el-button primary @click="createPost" type='primary'>Save</el-button>
        </div>
      </div>
      <mavon-editor v-model='body' language='en'></mavon-editor>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    title: {
      get() {
        return this.$store.state.postForm.title
      },
      set (val) {
        this.$store.commit('updatePostForm', { attr: 'title', val })
      }
    },
    body: {
      get() {
        return this.$store.state.postForm.body
      },
      set (val) {
        this.$store.commit('updatePostForm', { attr: 'body', val })
      }
    }
  },
  methods: {
    async createPost() {
      try {
        const post = await this.$store.dispatch('createPost')
        this.$message.info('作成しました')
        this.$router.push(`/posts/${post.id}`)
      } catch (e) {
        console.error(e)
        this.$message.error('失敗しました')
      }
    }
  }
}
</script>
