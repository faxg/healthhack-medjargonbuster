<script>
    import { onMount } from "svelte";
    
    const jquery = window.$; // loaded globally, but '$' is reserved by svelte compiler

    export let userInfo = undefined;
    
    $: state = 'start' // can be: start, uploaded, extracted, summarized

    $: text = undefined
    $: summarizedText = undefined
    $: summarizedHTML = undefined
    $: docTitle = "Summary"

    Dropzone.autoDiscover = false;

    function onUploadProgress (file, percent, bytesSend){
        console.log ("uploading...",percent, bytesSend);

        if (percent >= 100) {
            state = 'uploaded'
        }
    }
    function onUploadSuccess (file, response) {
        console.log ("Document successfully uploaded", file, response);
        text = response.text;
 
        createSummary();
    }
    function onSummarySuccess (data, status, jqXHR) {
        console.log ("Created summary", data);
        summarizedText = data.text;
        summarizedHTML = data.html;
        state = 'summarized'
    }


    function createSummary (){
        jquery.ajax({
            type: "POST",
            url: "http://jargonbusterbackend.azurewebsites.net/api/summarize",
            data: JSON.stringify ({"text": text}),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: onSummarySuccess,
            });
    }

    async function initDropzone() {
        var myDropzone = new Dropzone("#document-dropzone", {
            url: "http://jargonbusterbackend.azurewebsites.net/api/extract",
            success: onUploadSuccess,
            uploadprogress: onUploadProgress
        });
        console.log("Dropzone initialized", myDropzone);
        state = 'start'
    }

    onMount(async () => {
        await initDropzone()
    });




    function getTokenAndSubdomainAsync() {
        return new Promise(function (resolve, reject) {
            jquery.ajax({
                url: "http://jargonbusterbackend.azurewebsites.net/api/getIRToken",
                type: "GET",
                success: function (data) {
                    if (data.error) {
                        reject(data.error);
                    } else {
                        resolve(data);
                    }
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
    }


    function handleLaunchImmersiveReader() {
        getTokenAndSubdomainAsync()
            .then(function (response) {
                const token = response["token"];
                const subdomain = response["subdomain"];
                // Learn more about chunk usage and supported MIME types https://docs.microsoft.com/azure/cognitive-services/immersive-reader/reference#chunk
                const data = {
                    title: docTitle,
                    chunks: [{
                        content: summarizedHTML,
                        mimeType: "text/html"
                    }]
                };
                // Learn more about options https://docs.microsoft.com/azure/cognitive-services/immersive-reader/reference#options
                const options = {
                    "onExit": exitCallback,
                    "uiZIndex": 2000
                };
                ImmersiveReader.launchAsync(token, subdomain, data, options)
                    .catch(function (error) {
                        alert("Error in launching the Immersive Reader. Check the console.");
                        console.log(error);
                    });
            })
            .catch(function (error) {
                alert("Error in getting the Immersive Reader token and subdomain. Check the console.");
                console.log(error);
            });
    }

    function exitCallback() {
        console.log("This is the callback function. It is executed when the Immersive Reader closes.");
    }
</script>

<style>
    .col {
        padding-top: 20px;
    }

    .immersive-reader-button {
          background-color: white;
          margin-top: 5px;
          border: 1px solid black;
          float: right;
    }
</style>

<div class="row">
    {#if state == 'start' }
        <div class="col col-4 offset-4">
            <form action="#" class="dropzone" id="document-dropzone" />
        </div>
    {/if}
    {#if state == 'uploaded'}
        Document successfully uploaded. Summarizing now...
    {/if}
    {#if state == 'summarized'}
        <div class="col col-4 offset-4">
            <h3>Summary</h3>:
            {@html summarizedHTML}
            <p />
            <button 
                class="immersive-reader-button" 
                data-style-button="iconAndText" 
                data-locale="en"
                on:click="{handleLaunchImmersiveReader}">
                Immersive Reader
            </button>
        </div>
    {/if}


</div>
