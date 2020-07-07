<template>
    <div>{{ data }}</div>
</template>
<script>
export default {
    head(){
        return {
            title: 'Tìm sản phẩm'
        }
    },
    async fetch({store}) {
     
    },

    async asyncData ({ $axios, query }) {

        const res = await $axios.get('search', {
            params:{
                keywords: query.keywords
            }
        });

        return { 
            data: res.data
        }
    },

}
</script>