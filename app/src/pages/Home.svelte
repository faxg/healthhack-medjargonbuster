<script>
  import InfoCard from "../components/InfoCard.svelte";
  import Video from "../components/EmbeddedVideo.svelte";
  import UploadFile from "../components/UploadFile.svelte";

  import util from "../utils/auth-utils.js";

  export let userInfo = undefined;

  let Intro = {
    icon: "fa-search",
    smallTitle: "HealthHack 2020",
    bigTitle: "Welcome",
    border: "success",
    links: [
      {
        text: "Github Repository",
        href: "https://github.com/faxg/healthhack-medjargonbuster",
      },
    ],
  };

  let Demo = {
    icon: "fa-badge",
    smallTitle: "Demo",
    bigTitle: "Analyze a medical document. ",
    border: "primary",
    links: [
      {
        text: "About Azure Text Analytics for Health",
        href:
          "https://techcommunity.microsoft.com/t5/azure-ai/introducing-text-analytics-for-health/ba-p/1505152",
      },
      {
        text: "How to use (technical docs)",
        href:
          "https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-for-health?tabs=ner",
      },
      {
        text: "Quickstart Text Analytics SDK (technical docs)",
        href:
          "https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/quickstarts/text-analytics-sdk?tabs=version-3-1&pivots=programming-language-javascript",
      },
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
      Welcome to
      <b>Med Jargon Booster</b>
      This is a prototype we built during the HealthHack 2020. 
      <p>
      See our
      <a href="https://2020.healthhack.solutions/project/9">project page</a>
      for more info.
      </p>

      <Video src="https://www.youtube.com/embed/rBbk7ONsKF4" 
            title="Learn more about using AI to mine unstructured research papers to fight COVID-19."
            />


    </InfoCard>
  </div>
  <div class="col-sm-12 col-md-6 col-lg-8 col-xl-8 col-justify-content-center">
    <InfoCard props={Demo}>
      We'll try to analyze it and provide you with some insights.

      <p>
        {#if !userInfo}
          Please log in first.
          <p>
            <img class="img-responsive w-100" src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/203807i113493AE6DF87BE6/" alt="Overview"/>
          </p>
        {:else}
          <UploadFile>

          </UploadFile>
          Thanks for logging in
        {/if}
      </p>
    </InfoCard>
  </div>
</div>
