export const state = () => (
    {
        coupons: [],
        topProducts: []
    }
)

export const mutations = {
    set( state, data ){
        state.coupons = data
    },

    setTopProduct( state, data ){
        state.topProducts = data
    }
}

export const actions = {
    async get({ commit }){
        await this.$axios.get(`coupons-realtime`)
            .then( res => {
                if (res.status === 200) {
                    commit('set', res.data.data )
                }
            })
    },

    async getTopProducts({ commit }){
        await this.$axios.get(`products`)
            .then( res => {
                if (res.status === 200) {
                    commit('setTopProduct', res.data )
                }
            })
    }
}