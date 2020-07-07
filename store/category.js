export const state = () => (
    {
        categories: []
    }
)

export const mutations = {
    set( state, data ){
        state.categories = data
    }
}

export const actions = {
    async get({ commit }){
        await this.$axios.get(`/category`)
            .then( res => {
                if (res.status === 200) {
                    commit('set', res.data.payloads )
                }
            })
    }
}