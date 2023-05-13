<!-- PageHome.vue -->
<template>
    <div class="home">
        <img src="" alt="">
        <HelloWorld msg="Welcome to Your Vue.js App "/>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'PageHome',
  comments: {
    HelloWorld
  }
}
</script>
