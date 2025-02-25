<template>
    <div id="main-banner">
        <h1>Make Your Burger</h1>
    </div>
</template>

<script>
    
</script>

<style scoped>
    #main-banner{
        background-image: url('https://raw.githubusercontent.com/matheusbattisti/curso_vue_yt/refs/heads/main/18_projeto/public/img/burger.jpg');
        background-position: 0 -250px;
        background-size: cover;
        height: 800px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    #main-banner h1{
        color: #fff;
        text-align: center;
        font-size: 80px;
        padding: 20px 40px;
        transition: .5s;
    }

    #main-banner h1:hover {
        color: #FCBA03;
        background-color: transparent;
    }
</style>