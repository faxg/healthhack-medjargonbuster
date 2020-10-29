<script>
  import InfoCard from "../components/InfoCard.svelte";
  import util from '../utils/auth-utils.js'

  export let userInfo = undefined;


  let Intro = {
    icon: "fa-search",
    smallTitle: "HealthHack 2020",
    bigTitle: "Welcome",
    border: "success",
    links: [
      {
        text: "Github Repository",
        href: "https://github.com/faxg/healthhack-medjargonbuster"
      }
    ],
  };




</script>

<style>
  .col-sm-12,
  .col-md-6,
  .col-lg-4,
  .col-xl-4 {
    padding-top: 10px;
  }

</style>

<div class="row">
  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-justify-content-center">
    <InfoCard props={Intro}>      
      <div class="embed-responsive embed-responsive-16by9">
        <iframe
          title="Welcome to the Event"
          class="embed-responsive-item" 
          src="https://www.youtube.com/embed/GhFUhzTnYUU"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen />
      </div>

    </InfoCard>
  </div>


</div>
