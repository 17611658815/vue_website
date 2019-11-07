<style scoped>
  .box {
    width: 1440px;
    margin: 0 auto;
  }

  .box>div {
    width: 300px;
    box-sizing: border-box;
    float: left;
    margin: 0 30px 0;
  }

  .box>div>div {
    width: 300px;
    margin-bottom: 20px;
    background: #2C3E50;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 30px;
  }
</style>

<template>
  <div class="box">
    <div id="list1" class="node" ref="list1">
      <div v-for="(item,index) in list1" :key="index" :style="'height:'+item.height+'px;'">{{item.val}}</div>
    </div>
    <div id="list2" class="node" ref="list2">
      <div v-for="(item,index) in list2" :key="index" :style="'height:'+item.height+'px;'">{{item.val}}</div>
    </div>
    <div id="list3" class="node" ref="list3">
      <div v-for="(item,index) in list3" :key="index" :style="'height:'+item.height+'px;'">{{item.val}}</div>
    </div>
    <div id="list4" class="node" ref="list4">
      <div v-for="(item,index) in list4" :key="index" :style="'height:'+item.height+'px;'">{{item.val}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        arr: [{
            val: 1,
            height: 300
          },
          {
            val: 2,
            height: 400
          },
          {
            val: 3,
            height: 200
          },
          {
            val: 4,
            height: 500
          },
          {
            val: 5,
            height: 200
          },
          {
            val: 6,
            height: 300
          },
          {
            val: 7,
            height: 200
          },
          {
            val: 8,
            height: 600
          },
          {
            val: 9,
            height: 400
          },
          {
            val: 10,
            height: 500
          },
          {
            val: 11,
            height: 250
          },
          {
            val: 12,
            height: 200
          },
          {
            val: 13,
            height: 500
          },
          {
            val: 14,
            height: 200
          },
          {
            val: 15,
            height: 200
          },
          {
            val: 16,
            height: 300
          }
        ],
        list1: [],
        list2: [],
        list3: [],
        list4: [],
      };
    },
    mounted() {
      this.onlode()
    },
    methods: {
      onlode() {
        let item = this.arr.shift()
        if (item == null) {
          return
        }
        let arr = [];
        let nodes = document.getElementsByClassName('node');
        for (let i = 0; i < nodes.length; i++) {
          arr.push(nodes[i].clientHeight)
        }
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == this.getMin(...arr)) {
            this['list' + (i + 1)].push(item)
            break;
          }
        }
        this.$nextTick(function() {
          this.onlode()
        })
      },

      getMin(a, b, c, d) {
        let min = 0;
        min = a > b ? b : a;
        min = min > c ? c : min;
        min = min > d ? d : min;
        return min
      },
    }
  }
</script>
