<style lang='scss'>
.post-header {
  margin: 0 0 3rem;
}
.post-title {
  font-size: 2.2rem;
  margin: 2rem 0 0;
}
.created-at {
  font-size: .8rem;
  margin: 0;
}
.post-body {
  font-size: .9rem;
  padding-bottom: 100px;

  p {
    margin: 1rem 0;
  }
}
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;

  th,td {
    overflow: scroll;
    border: 1px solid #eee;
    padding: 5px 10px;
  }
}
pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}
</style>

<template>
  <div class="posts-show">
    <div class="container">
      <div class="post-header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/posts' }">記事一覧</el-breadcrumb-item>
          <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <h1 class='post-title'>{{ post.title }}</h1>
        <p class="created-at">{{ moment(post.createdAt).format('lll') }}</p>
      </div>
      <div class="post-body markdown-body" v-html='postBody'>
      </div>
    </div>
  </div>
</template>

<script>
import markdownIt from '../../plugins//markdown-it'
import moment from 'moment'

export default {
  computed: {
    post() {
      const id = this.$route.params.id
      const _post = this.$store.getters.findPost(id)
      if (!_post) {
        return { title: '', body: '' }
      }
      return _post
    },
    postBody() {
      return markdownIt.render(this.post.body)
    }
  },
  methods: {
    moment,
  }
}
</script>
