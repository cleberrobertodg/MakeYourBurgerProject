<template>
    <div id="main-banner">
    <video ref="backgroundVideo" autoplay muted playsinline onloadedmetadata="this.playbackRate=0.5;">
      <source src="https://v.ftcdn.net/09/19/72/30/700_F_919723081_8X6YRQyBRZjU3XPLTHWFIATMWMLWdrVD_ST.mp4" type="video/mp4" />
      Seu navegador não suporta vídeos em HTML5.
    </video>
    <div class="overlay"></div>
    <h1>Make Your Burguer</h1>
  </div>
</template>

<script>
    
</script>

<style scoped>
    #main-banner{
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    #main-banner h1{
        
        position: relative;
        color: #fff;
        font-size: 4vw;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.8); 
        padding: 15px 30px;
        border-radius: 10px;
        z-index: 2;
    }

    #main-banner video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
    #main-banner .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
</style>