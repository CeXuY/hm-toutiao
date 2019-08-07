<template>
  <div class="contasiner">
    <div class="header">header</div>
    <!-- content -->
    <div class="content">
      <!-- 插槽  如果不写名字  认为是默认插槽 -->
      <!-- 给插槽取名字   具名插槽 -->
      <slot name="content" :msg="msg"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-text',
  data () {
    return {
      msg: '组件内的数据'
    }
  }
}
</script>

<style>
</style>
