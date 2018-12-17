<template>
  <div class="hello">首页</div>
</template>

<script>
import libs from '../libs/'
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  created() {
    console.log("执行created");
  },
  mounted() {
    let ss = "23323";
    console.log("执行mounted", ss);
    console.log("执行mounted", [5, ...[1, 2, 3, 4]]);
    console.log(" document.getElementById('app')", document.getElementById("app"));
    console.log("这是loibs",  libs.add());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
