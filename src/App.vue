<template>
  <div>
    <Navbar :logo="logo_src" :alt="app_name"/>
    <router-view/>
    <Footer />
  </div>

</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'


export default {
  components: {
    Navbar,
    Footer
  },
  data(){
    return{
      logo_src: "https://raw.githubusercontent.com/matheusbattisti/curso_vue_yt/refs/heads/main/18_projeto/public/img/logo.png",
      app_name: "Make Your Burger"
    }
  }
}
</script>

<style>

  *{
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    
  }

  .main-container{
    margin: 50px;
    min-height: 550px;
  }

  h1{
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }
</style>

