
var app = new Vue({
  el: '#app',
  data: {
    msg: 'vue强势登场',
    tit: 'woowowowowow',
    item: ['更轻', '更快', '组件化', '虚拟dom']
  }
})

Vue.component('side', {
  template: '<p>mvvm框架{{tode}}</p>',
  props: ['tode']
})

var app3 = new Vue({
  el: '.app3',
  data: {
    item: {
      更轻: '压缩后只有20多K',
      更快: "双向绑定",
      组件化:'所有的元素以组件存在',
      虚拟dom:'对dom操作开销更小'
    },
    seen: false,
    msg: ""
  },
  methods: {
    jump: function () {
      this.seen = true
    } 
  },
  filters: {
    canvans: function (val, a) {
      return   'angular' +'&'+ a +" "+val.split('').reverse().join('')
    }
  }


})
// app3.seen=true
console.log(app3.seen, $('.caa'))

