<style lang='scss' scoped>
.hero {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;

  .main-text {
    font-size: 2rem;
    font-weight: 600;
  }
  .description {
    font-size: 1.4rem;
  }
}
</style>

<template>
  <div class="pages-index">
    <div class="container">
      <div class="hero">
        <h1 class='main-text'>Store your secure, private data <br/> onto secure storage you choosen</h1>
        <p class='description'>Monolith is a markdown memo app that stores user's data onto user's storage directly.</p>
      </div>
    </div>
  </div>
</template>

<script>
const blockstack = require('blockstack')

export default {
  name: 'Top',
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.replace('/posts')
    }
  },
  data () {
    return {
      msg: 'Markdown app by blockstack'
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('signIn')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
