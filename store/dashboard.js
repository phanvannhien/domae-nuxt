export const state = () => (
    {
        pending_commission: 0,
        approved_commission: 0,
        cancel_commission: 0,
        traficData: {} 
    }
)

export const mutations = {
    set( state, data ){
        state.traficData = data
    }
}

export const actions = {
    async get({ commit }){
        await this.$axios.get(`/report/clicks`)
            .then( res => {
                if (res.status === 200) {
                    commit('set', res.data )
                  }
            })
    }
}