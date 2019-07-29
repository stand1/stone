<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{count}}</h2>
    <div>
      <button @click="handleActionsAdd">异步增加</button>
      <button @click="handleActionsReduce">异步减少</button>
    </div>
    <vue-seamless-scroll :class-option="optionSwitch" class="seamless-warp3">
      <span slot="left-switch" class="left-arrow"></span>
      <span slot="right-switch" class="right-arrow"></span>
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">{{item}}</li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello World',
      listData: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {
    // ...mapMutations({
    //   handleAddClick: 'mutationsAddCount',
    //   handleReduceClick: 'mutationsReduceCount'
    // }),
    ...mapActions({
      handleActionsAdd: 'actionsAddCount',
      handleActionsReduce: 'actionsReduceCount'
    })
  },
  computed: {
    ...mapGetters({
      count: 'getterCount'
    }),
    optionSwitch () {
      return {
        autoPlay: false,
        switchSingleStep: 140
      }
    }
    // count () {
    //   return this.$store.getters.getterCount
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
  h1{
    font-size:0.2rem;
    border-bottom: 0.01rem solid #aaa;
    box-sizing: border-box;
    width: 7.5rem;
  }
}
.seamless-warp3 {
  overflow: hidden;
  height: 140px;
  width: 140px * 4;
  margin: 0 auto;
  .left-arrow, .right-arrow {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #00a0e9;
    cursor: pointer;
    &:hover {
      background-color: #0f39fa;
    }
    &::before {
      position: absolute;
      content: '';
      width: 16px;
      height: 16px;
      top: 12px;
      left: 15px;
      border: 2px solid #fff;
    }
  }
  .left-arrow::before {
    border-right: 0;
    border-bottom: 0;
    transform: rotate(-45deg);
  }
  .right-arrow::before {
    border-left: 0;
    border-top: 0;
    left: 9px;
    transform: rotate(-45deg);
  }
  ul.item {
    width: 140px * 8;
    li {
      float: left;
      width: 120px;
      height: 120px;
      margin: 10px;
      line-height: 120px;
      background-color: #999;
      color: #fff;
      text-align: center;
      font-size: 30px;
    }
  }
}
</style>
