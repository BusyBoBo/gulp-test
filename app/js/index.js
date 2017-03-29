
var app = new Vue({
  el: '#app',
  data: {
    msg: 'vue强势登场',
    tit: 'woowowowowow',
    item: [12, 12, 232323, 232323]
  }
})

Vue.component('side', {
  template: '<p>组件化开发{{tode}}</p>',
  props: ['tode']
})

var app3 = new Vue({
  el: '.app3',
  data: {
    item: {
      zk: 1221,
      djkfdjfk: "看到市警方看电视剧福克斯",
      hahahaha:'jdkfjdk非金属矿降幅迪斯科解放',
      kfsdfjkfsdjfks:'jdkfjskfjdskfjkdsfjkdsf'
    },
    seen: false,
    msg: "红红火火恍恍惚惚"
  },
  methods: {
    jump: function () {
      this.seen = true
    }
  },
  filters: {
    canvans: function (val, a) {
      return val.split('').reverse().join('') + 'angular不服' + a
    }
  }


})
// app3.seen=true
console.log(app3.seen, $('.caa'))

