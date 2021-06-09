import Vue from './vue.js'

const vm = new Vue({
  el:'#app',
  data:{
    msg:'hello vue'
  },
  methods:{
    handler(){
      console.log(333);
    }
  }
})