import { setToken, getToken, removeToken } from '@/utils/storage'

const state = {
    token: getToken(),
    userInfo: null
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo
    }
}

const actions = {
    // 登录动作
    login({ commit }, token) {
        setToken(token)
        commit('SET_TOKEN', token)
    },
    // 登出动作
    logout({ commit }) {
        removeToken()
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', null)
    },
    // 设置用户信息
    setUserInfo({ commit }, userInfo) {
        commit('SET_USER_INFO', userInfo)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
