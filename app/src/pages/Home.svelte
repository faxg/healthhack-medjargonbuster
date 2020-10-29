<script>
  import InfoCard from "../components/InfoCard.svelte";
  import util from '../utils/auth-utils.js'

  export let userInfo = undefined;


  let Intro = {
    icon: "fa-search",
    smallTitle: "MAKEathon 2020",
    bigTitle: "Welcome",
    border: "success",
    links: [
      {
        text: "Github Repository",
        href: "https://github.com/faxg/MAKEathon2020FHNW",
      },
      {
        text: "Azure Static Web Apps (SWA)",
        href: "https://azure.microsoft.com/en-us/services/app-service/static/",
      },
      {
        text: "VS.code Extension ",
        href: "https://aka.ms/savscode",
      },
    ],
  };

  let Services = {
    icon: "fa-list",
    smallTitle: "Azure Services",
    bigTitle: "Find Azure Services for your Idea",
    border: "primary",
  };

  let LearnerBadge = {
    icon: "fa-certificate",
    smallTitle: "Azure Heroes",
    bigTitle: "Claim your 'Learner' Azure Hero Badge",
    border: "info",
    links: [
      {
        text: "More Info on Azure Heroes...",
        href: "https://www.microsoft.com/skills/azureheroes",
      },
    ],
  };

  let learningAndSupport = {
    icon: "fa-graduation-cap",
    smallTitle: "Learning And Support",
    bigTitle: "Learn More and get Help...",
    border: "info",
    links: [
      {
        text: "Microsoft Learn",
        href: "https://docs.microsoft.com/en-us/learn/",
      },
      { text: "Learn TV", href: "https://docs.microsoft.com/en-us/learn/tv/" },
      { text: "Dev.to", href: "https://dev.to/" },
      {
        text: "Stackoverflow",
        href: "https://stackoverflow.com/questions/tagged/azure",
      },
    ],
  };

  let starterTemplate = {
    icon: "fa-rocket",
    smallTitle: "Azure Starter Template",
    bigTitle: "How to use this for your project",
    border: "info",
    links: [
      {
        text: "Learn more about Azure Static Web Apps (SWA)",
        href: "https://aka.ms/staticwebapps",
      },
      {
        text: "Azure Functions Reference for Node/JavaScript",
        href: "https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node",
      },
      {
        text: "Azure Serverless community library - JavaScript ",
        href: "https://serverlesslibrary.net/?language=JavaScript",
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
  .badge-icon,
  .qr-code {
    width: 40%;
  }
</style>

<div class="row">
  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-justify-content-center">
    <InfoCard props={Intro}>
      Welcome to the MAKEathon 2020 @ FHNW Azure Starter Template. You'll find
      information on:
      <p/>
      <ul>
        <li>Azure Services you could use</li>
        <li>How to claim your "Learner" Azure Hero Badge</li>
        <li>How to find further Learning material and get support</li>
        <li>How to fork & use this Starter Template</li>
 
      </ul>

      
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

  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4  justify-content-center">
    <InfoCard props={Services}>
      You may already have an idea for a project or a challenge. Here are some
      useful Azure Services:
      <p/>
      <ul>
        <li>
          <a
            href="https://docs.microsoft.com/en-us/azure/cognitive-services/">Azure
            Cognitive Services</a>
        </li>
        <li>
          <a
            href="https://azure.microsoft.com/en-us/services/machine-learning/">Azure
            Machine Learning</a>
        </li>
        <li>
          <a href="https://notebooks.azure.com/"> Azure Jupyter Notebooks</a>
        </li>
        <li>
          <a
            href="https://azure.microsoft.com/en-us/services/app-service/containers/">Azure
            App Service - Web App for Containers</a>
        </li>
        <li>
          <a
            href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-vs-code?pivots=programming-language-javascript">Azure
            Functions (Serverless)</a>
        </li>
        <li>
          <a
            href="https://azure.microsoft.com/en-us/services/app-service/static/">Azure
            Static Web Apps (SWA)</a>
        </li>
        <li>
          <a href="https://azure.microsoft.com/en-us/services/cosmos-db/">Azure
            CosmosDB</a>
        </li>
        <li>
          <a href="https://azure.microsoft.com/en-us/overview/iot/">Azure IoT</a>
        </li>
        <li>
          <a href="https://azure.microsoft.com/en-us/services/signalr-service/">Azure SignalR Service (Real-time)</a>
        </li>
        <li>
          <a href="https://docs.microsoft.com/en-us/gaming/playfab/">Azure PlayFab</a>
        </li>        
      </ul>
    </InfoCard>
  </div>

  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 justify-content-center">
    <InfoCard props={LearnerBadge}>
      You can claim your Microsoft Azure Hero "Learner" Badge here.
      <p/>
      <span>
        {#if userInfo}
        <img alt="Azure Heroes Learner" class="img img-fluid badge-icon" 
            src="{`${util.API}/get-badge?type=learner&what=badger`}" />
        <img alt="Azure Heroes QR" class="img img-fluid qr-code" 
              src="{`${util.API}/get-badge?type=learner&what=qr`}" />
        {:else}
        <h2>You are not logged in</h2> - please log in to see the QR code to claim your Badge.
        
        {/if}

      </span>
    </InfoCard>
  </div>

  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 justify-content-center">
    <InfoCard props={learningAndSupport}>
      Find help online. We have lots of articles, tutorials and videos
      available. 
      To get started, here's a video with an overview on Azure Machine Learning.
    <p/>
      <div class="embed-responsive embed-responsive-16by9">
        <iframe src="https://channel9.msdn.com/Shows/AI-Show/Allup-Azure-ML/player" width="480" height="270" allowFullScreen frameBorder="0" title="What’s new with Azure Machine Learning - Microsoft Channel 9 Video"></iframe>
      </div>
    </InfoCard>
  </div>

  <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8 justify-content-center">
    <InfoCard props={starterTemplate}>
      This is the
      <b>MAKEathon Hackathon Starter</b>
      on Azure.&nbsp;
      <br />
      You can use this as a starting point for your own web application. It's
      <b>Full-Stack Javascript</b>
      (for now) :
      <ul>
        <li>
          <b>Frontend</b>: this website. Written in
          <a href="https://svelte.dev/">Svelte</a>, but many frameworks are
          supported (Angular, React, ...). Just build your own frontend in the
          <code>/app</code> and tell Azure where to find the
          <code>npm build</code> results. (e.g. /app/public)
        </li>
        <li>
          <b>API</b>: Serverless (Azure Functions) backend
          <code>/api</code>. Implement your serverless backend in
          JavaScript/Typescript. 
        </li>
      </ul>
      You can clone & deploy this to Azure in 5 minutes. You'll get:
      <br/>
      <img
        class="img-fluid"
        width="70%"
        alt="SWA Overview"
        src="https://azurecomcdn.azureedge.net/cvt-4abbf0604519d6747e8628e7d4a627c7bc7d78cea01076877c54698df471f916/images/page/services/app-service/static/value-prop-2.png" />
    </InfoCard>
  </div>
</div>
