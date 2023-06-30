import { createStore } from 'vuex'

const init_formcache = ()=>{
  const cache =  JSON.parse(localStorage.getItem("formcache") || "[]")
  console.log("formcache", cache)
  return cache
} 

export default createStore({
  state: {
    formcache: init_formcache() as {key: string, label:string, data:any}[]
  },
  getters: {
  },
  mutations: {
    update_formcache(state, formcache){
      state.formcache = formcache
    }
  },
  actions: {
  },
  modules: {
  }
})
