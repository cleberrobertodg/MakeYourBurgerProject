<template>
    <div id="nav">
        <router-link to="/" id="logo-url">
            <img :src="logo" :alt="alt" id="logo">
        </router-link>
            <router-link to="/">Home</router-link>  
            <router-link to="/pedidos">Pedidos</router-link>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    props: ["logo", "alt"]
}
</script>

<style scoped>
    #nav{
        background-color: #222;
        border-bottom: 6px solid #111;
        padding: 15px 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100px;
    }

    #nav #logo-url{
        margin: auto;
        margin-left: 0;
    }

    #logo{
        width: 60px;
        height: 60px;
    }

    #nav a{
        color: #FCBA03;
        text-decoration: none;
        margin: 12px;
        transition: .5s;
        font-size: 20px;
    }

    #nav a:hover{
        color: #fff;
    }

</style>