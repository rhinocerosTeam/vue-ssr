<template>
  <div class="hello">关于我们页面
    <div class="hello">关于我们页面
      <div class="hello">关于我们页面
        <div class="hello">关于我们页面
          <div class="hello">关于我们页面</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import libs from "../libs/";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  created() {},
  mounted() {
    console.log("这是loibs", libs.add());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
