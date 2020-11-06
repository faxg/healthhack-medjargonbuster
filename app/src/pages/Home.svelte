<script>
  import InfoCard from "../components/InfoCard.svelte";
  import Video from "../components/EmbeddedVideo.svelte";
  import UploadFile from "../components/UploadFile.svelte";

  import util from "../utils/auth-utils.js";

  export let userInfo = undefined;

  let Intro = {
    icon: "fa-search",
    smallTitle: "Welcome",
    bigTitle: "A contribution to the DayOne HealthHack 2020 'Jargon Buster' challenge",
    border: "success",
    links: [
      {
        text: "Github Repository: Frontend",
        href: "https://github.com/faxg/healthhack-medjargonbuster",
      },
      {
        text: "Github Repository: Backend",
        href: "https://github.com/faxg/jargonbuster-backend",
      },
    ],
  };

  let Demo = {
    icon: "fa-fire",
    smallTitle: "About the Challenge",
    bigTitle: "What can I do here?",
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
  .img-splash {
    height: 300px;
    width: auto;
  }
</style>

<div class="row">
    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-justify-content-center">
      <InfoCard props={Intro}>
        <div class="col-12 center-block text-center">
          <img class="img img-responsive img-splash" src="/img/splash.png" alt="splash" />
          <p />
          {#if userInfo}
            <a href="/start" class="btn btn-large btn-success">START HERE</a>
          {:else}
            <a href="/login" class="btn btn-large btn-warning">Please login first</a>
          {/if}      
        </div>

      </InfoCard>
    </div>

  <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-justify-content-center">
    <InfoCard props={Demo}>
        The amount of medical information available to patients can be overwhelming and intimidating. 
        Most patients also struggle to understand the medical jargon in clinical reports, research papers and in conversations with healthcare professionals.
        <p/>
        This project uses a combination of Open Source software and Microsoft Azure Cognitive Services to empower patients to better understand medical jargon.
        Currently we provide the following features:
        <p/>

        <ul>
            <li>Automatic summarization of medical documents, reports or audio transcipts</li>
            <li>Extraction of key concepts, entities and relationships from the medical text</li>
            <li>Providing definitions for medical jargon via Merriam-Webster medical dictionary</li>
            <li>Integrated reader experience, supporting patients with reading diffculties.</li>
            <li>Automatic translation into many languages, including Text-to-Speech</li>
        </ul>


    </InfoCard>
  </div>
</div>
