<!--suppress ES6MissingAwait -->
<template>
  <div class="home">
<!--    <v-row justify="center">-->
<!--      <v-img-->
<!--          src="https://get.pxhere.com/photo/record-music-technology-vintage-play-retro-guitar-home-analog-equipment-metal-studio-player-amplifier-dj-musical-instrument-electronic-device-stereo-bass-audio-silver-musical-sound-system-front-volume-listen-entertainment-loud-obsolete-synthesizer-hi-fi-radio-receiver-string-instrument-electronic-instrument-guitar-amplifier-1292538.jpg"-->
<!--          max-height="500"-->
<!--          max-width="1000"-->
<!--      >-->
<!--      </v-img>-->
<!--    </v-row>-->
    <AboutUs></AboutUs>
    <HomePageCollection class="pt-8"></HomePageCollection>
  </div>
</template>

<script>
import HomePageCollection from "@/components/HomePageCollection";
import AboutUs from "@/views/AboutUs";

export default {
  name: "Home",
  components: {AboutUs, HomePageCollection }
}



</script>
