<style lang='scss' scoped>
.post-list-header {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  h1 {
    margin: 0;
  }
  .list-control {
    // width: 100px;
  }
}
.post-item {
  border-bottom: 1px solid #eee;
  padding: .5rem 0;
  display: flex;
  justify-content: space-between;

  .post-box {
    width: calc(100% - 110px);
    h1 {
      margin: 0;
      a {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        word-break: break-all;
        color: #4d4d4d;
        text-decoration: none;
        display: inline-block;
        &:visited {
          color: #888888;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

</style>

<template>
  <div class="pages-posts-index">
    <div class="container">
      <div class="post-list-header">
        <h1>Post list</h1>
        <div class="list-control">
          <el-button @click="$router.push('/posts/new')" type='primary'>Add</el-button>
        </div>
      </div>
      <div class="posts">
        <div class="post-item" v-for='post in posts' :key='post.id'>
          <div class="post-box">
            <h1>
              <router-link :to="'/posts/' + post.id">{{ post.title }}</router-link>
            </h1>
          </div>
          <div class="post-control">
            <el-button type="primary" icon="el-icon-edit" circle @click="editPost(post)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deletePost(post)" circle></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      let items = [];
      try {
        items = this.$store.getters.recentPosts
        console.log('no error');
      } catch (e) {
        console.warn('got error');
      }
      return items;
    },
    authError() {
      console.log(this.$store.getters.authError);
      return this.$store.getters.authError
    },
  },
  methods: {
    deletePost(post) {
      this.$store.dispatch('deletePost', { post })
    },
    editPost(post) {
      this.$router.push(`/posts/${post.id}/edit`)
    }
  },
  watch: {
    authError(val) {
      if (!val) return;

      this.$notify.error({
        title: 'Error',
        message: "You don't have permission",
      });
    },
  },
}
</script>

