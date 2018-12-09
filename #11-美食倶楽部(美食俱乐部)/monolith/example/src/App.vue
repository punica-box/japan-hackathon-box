<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  max-width: 980px;
  margin: 0 auto;
}
</style>

<style lang='scss' scoped>
.header-signin {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  .title {
    a {
      color: #444;
      text-decoration: none;
    }
  }

  .right-menu {
    display: flex;
    align-items: center;
  }

  .avatar {
    margin-right: 1rem;
  }
  .signout {
    text-decoration: none;
    color: #aaa;
  }
}
.header-signin .avatar {
  border: 1px solid #eee;
  border-radius: 50%;
}
.header-guest {
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
  }
}
</style>


<template>
  <div id="app">
    <el-container>
      <el-header class='header' height='auto'>
        <div class="container">
          <div class="header-signin" v-if='this.$store.getters.isAuthenticated'>
            <h1 class='title'>
              <a href="/">Monolith</a>
            </h1>
            <div class="right-menu">
              <img class='avatar' :src='$store.getters.authUser.imageUrl' alt="avatar" :width='40' :height='40'>
              <a class='signout' href="#" @click="signOut()">sign out</a>
            </div>
          </div>
          <div class="header-guest" v-else>
            <h1 class='title'>Monolith</h1>
            <div class="right-menu">
              <el-button type='primary' @click="signIn()">Sign in</el-button>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
  },
  methods: {
    async signIn() {
      await this.$store.dispatch('signIn');
      window.location.reload();
    },
    async signOut() {
      await this.$store.dispatch('signOut');
      window.location.reload();
    },
  }
}
</script>
