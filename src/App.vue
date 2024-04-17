<template>
  <div class="w-100 h-100 p-0 m-0" id="app">
    <!-- <HomePage /> -->
    <!-- <CheckoutPage :id="1"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HomePage from './pages/home/HomePage.vue'
 // import CheckoutPage from './pages/checkout/CheckoutPage.vue'
export default {
  name: 'App',
  components: {
    // HomePage
    // CheckoutPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
