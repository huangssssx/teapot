import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user
    },
    // 可以在这里添加全局的 state, getters, mutations, actions
})

export default store
