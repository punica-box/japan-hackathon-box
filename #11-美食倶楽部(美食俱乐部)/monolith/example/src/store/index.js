import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { Client } from '../cosmo-client'
import { client } from 'ontology-dapi';

const uuidv4 = require('uuid/v4');

const sessionTokenKey = 'sessionToken';

function getSessionToken() {
  return window.localStorage.getItem(sessionTokenKey);
}

const createStore = () => {
  const [db, initDB, revokeDB] = (() => {
    let _db = null;
    const db = () => _db;
    const initDB = (sessionToken) => {
      _db = new Client('127.0.0.1', 21982, { sessionToken })
    };
    const revokeDB = () => {
      _db = null;
    }
    return [ db, initDB, revokeDB ];
  })();

  client.registerClient({});

  return new Vuex.Store({
    state: {
      postForm: {
        title: '',
        body: '',
      },
      auth: {
        status: 'not', // pending, signin
        person: null,
      },
      posts: [],
      authError: null,
    },
    getters: {
      isAuthenticated(state) {
        return state.auth.status === 'signin'
      },
      authUser(state) {
        return state.auth.person;
      },
      findPost: (state) => (id) => {
        return state.posts.find(post => post.id === id)
      },
      recentPosts(state) {
        if (state.authError) return [];

        return state.posts.sort((p1, p2) => {
          const a = p1.createdAt
          const b = p2.createdAt
          if (a < b) return 1
          if (a > b) return -1
          return 0
        })
      },
      authError(state) {
        return state.authError
      }
    },
    mutations: {
      setAuthPerson(state, person) {
        state.auth.person = person
      },
      setAuthStatus(state, status) {
        state.auth.status = status
      },
      setPosts(state, posts) {
        state.posts = posts
      },
      updatePostForm(state, { attr, val }) {
        state.postForm[attr] = val
      },
      addPost(state, post) {
        state.posts.push(post)
      },
      updatePost(state, post) {
        const idx = this.state.posts.findIndex(p => p.id === post.id)
        this.state.posts.splice(idx, 1, post)
      },
      deletePost(state, post) {
        const idx = state.posts.findIndex(p => p.id === post.id)
        state.posts.splice(idx, 1)
      },
      setAuthError(state, e) {
        state.authError = e;
      },
    },
    actions: {
      init({ commit, dispatch }) {
        const sessionToken = getSessionToken();
        if (sessionToken) {
          // TODO: use actual user data
          const person = {
            name: 'noname',
            imageUrl: 'https://gaia.blockstack.org/hub/1KLzSLktx8xV35pR4z5maCBWQiVjG3sUef//avatar-0?0.7366012623625917',
            description: 'no description',
          }
          initDB(sessionToken);
          commit('setAuthPerson', person)
          commit('setAuthStatus', 'signin')
          dispatch('loadPosts')
        }
      },
      async signIn({ commit }) {
        const account = await client.api.asset.getAccount();
        console.log('account', account);
        const sig = await client.api.message.signMessage({ message: account });
        console.log(sig);

        const sessionToken = `${account}:${sig.publicKey}:${sig.data}`;
        window.localStorage.setItem(sessionTokenKey, sessionToken);
      },
      signOut({ commit }) {
        revokeDB();
        window.localStorage.removeItem(sessionTokenKey);
      },
      async loadPosts({ commit }) {
        try {
          const posts = await db().collection('posts').get()
          commit('setPosts', posts)
        } catch (e) {
          commit('setAuthError', e);
        }
      },
      async createPost({ commit, dispatch }) {
        const d = new Date()
        const params = {
          title: this.state.postForm.title,
          body: this.state.postForm.body,
          createdAt: d.toISOString(),
          updatedAt: d.toISOString(),
        }
        const post = await db().collection('posts').add(params)
        commit('addPost', post)
        return post
      },
      deletePost({ commit, dispatch }, { post }) {
        commit('deletePost', post)
        db().collection('posts').doc(post.id).delete()
      },
      updatePost({ commit, dispatch }, post) {
        const d = new Date()
        post.createdAt = d.toISOString()

        commit('updatePost', post)
        db().collection('posts').doc(post.id).set(post)
      }
    }
  })
}

export default createStore
