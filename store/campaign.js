export const state = () => (
    {
        campaigns: []
    }
)

export const mutations = {
    set( state, data ){
        state.campaigns = data
    }
}

export const actions = {
    async get({ commit }){
        await this.$axios.get(`/campaign-affiliate`)
            .then( res => {
                if (res.status === 200) {
                    commit('set', res.data.payloads )
                }
            })
    }
}