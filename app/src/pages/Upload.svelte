<script>
    import { onMount } from "svelte";
    const jquery = window.$; // loaded globally, but '$' is reserved by svelte compiler
    import tippy from "tippy.js";
    import "tippy.js/dist/tippy.css"; // optional for styling

    export let userInfo = undefined;

    $: state = "start"; // can be: start, uploading, summarizing, done

    $: text = undefined;
    $: summarizedText = undefined;
    $: summarizedHTML = undefined;
    $: documentClassification = "Research report";

    $: docTitle = "Summary";
    $: docMetadata = "Authors: John doe et al. (c) the internet, 2020<br>Pages: 10<br>Words: 3721"
    $: dictionaryResult = undefined;

    // Learn more about options 
    // https://docs.microsoft.com/azure/cognitive-services/immersive-reader/reference#options
    var immersiveReaderOptions = {
        onExit: exitCallback,
        uiZIndex: 2000,
    }


    function showDictionaryTooltip(term, content) {
        var positionTarget = "#avatar";

        var tooltip = tippy(positionTarget, {
            content: "No content",
            arrow: true,
            allowHTML: true,
            interactive: true,
            trigger: "manual",
            placement: 'auto',
        })[0];
        //console.log(tooltip);        
        var htmlContent = term=='' ? content : '<h4 class="bg-info">'+term+'</h4>' + content;
        tooltip.setContent(htmlContent);

        tooltip.show();
    }

    Dropzone.autoDiscover = false;

    function onUploadProgress(file, percent, bytesSend) {
        console.log("uploading...", percent, bytesSend);
        state = "uploading";
    }
    function onUploadSuccess(file, response) {
        console.log("Document successfully uploaded", file, response);
        text = response.text;
        docTitle = file.name; // # TODO should be extracted by API instead
        state = "summarizing";

        // Trigger summary creation
        createSummary();
    }
    function onSummarySuccess(data, status, jqXHR) {
        console.log("Created summary", data);
        summarizedText = data.text;
        summarizedHTML = data.html;
        state = "done";
    }

    /**
     * Gets the currently selected text (for dictonary lookup)
     */
    function getSelectedText() {
        if (window.getSelection) {
            return window.getSelection().toString();
        } else if (document.selection) {
            return document.selection.createRange().text;
        }
        return "";
    }

    function handleDictionaryLookup() {
        var text = getSelectedText();

        if (text != "") {
            jquery.ajax({
                url:
                    "https://jargonbusterbackend.azurewebsites.net/api/definition?term=" +
                    text,
                type: "GET",
                success: function (data) {
                    console.log(data);
                    if (data.definitions) {
                        dictionaryResult = data.definitions[0];
                    } else {
                        dictionaryResult = "Sorry, I can't give you a better explanation right now.";
                    }
                    showDictionaryTooltip(text, dictionaryResult);
                },
                error: function (err) {
                    console.log("Error looking up medical dictionary", err);
                    dictionaryResult = err;
                    showDictionaryTooltip("Error looking up in the dictionary :(", dictionaryResult);
                },
            });
        } else {
            dictionaryResult = "Please select a medical term in the text";
            showDictionaryTooltip('',dictionaryResult);
        }
    }

    function createSummary() {
        jquery.ajax({
            type: "POST",
            url: "https://jargonbusterbackend.azurewebsites.net/api/summarize",
            data: JSON.stringify({ text: text }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onSummarySuccess,
        });
    }

    async function initDropzone() {
        var myDropzone = new Dropzone("#document-dropzone", {
            url: "https://jargonbusterbackend.azurewebsites.net/api/extract",
            success: onUploadSuccess,
            uploadprogress: onUploadProgress,
        });
        console.log("Dropzone initialized", myDropzone);
    }

    onMount(async () => {
        await initDropzone();
        state = "start";
    });

    function getTokenAndSubdomainAsync() {
        return new Promise(function (resolve, reject) {
            jquery.ajax({
                url:
                    "https://jargonbusterbackend.azurewebsites.net/api/getIRToken",
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
                },
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
                    chunks: [
                        {
                            content: summarizedHTML,
                            mimeType: "text/html",
                        },
                    ],
                };
                const options = immersiveReaderOptions;
                ImmersiveReader.launchAsync(
                    token,
                    subdomain,
                    data,
                    options
                ).catch(function (error) {
                    alert(
                        "Error in launching the Immersive Reader. Check the console."
                    );
                    console.log(error);
                });
            })
            .catch(function (error) {
                alert(
                    "Error in getting the Immersive Reader token and subdomain. Check the console."
                );
                console.log(error);
            });
    }

    function exitCallback() {
        console.log(
            "This is the callback function. It is executed when the Immersive Reader closes."
        );
    }
</script>

<style>
    .col {
        padding-top: 20px;
    }
    .top-space {
        padding-top: 30px;
    }

    .immersive-reader-button {
        background-color: white;
        margin-top: 5px;
        border: 1px solid black;
        float: right;
    }
    #avatar {
        max-height: 400px;
    }
</style>


{#if state != 'done'}
<div class="row h-100 top-space">
    <div class="col-md-8 offset-md-2">
        {#if state == 'start'}
            <h3>Upload a PDF document</h3>
            <form action="#" class="dropzone" id="document-dropzone" />
        {/if}
        {#if state == 'uploading'}
            <h3>Extract and clean text</h3>
            <span class="loader-1" />
        {/if}
        {#if state == 'summarizing'}
            <h3>Create Summary</h3>
            <span class="loader-2" />
        {/if}
        </div>
</div>
{/if}



{#if state == 'done'}
    <div class="row top-space">
        <div class="col-8">
            <h3>{docTitle}</h3>
            This looks like a <i class="big bg-success">{documentClassification}</i>
            <br />
            The key topics of the document are <i class="bg-primary">_____</i>, 
            <i class="bg-warning">_____</i> and <i class="bg-info">____</i>
        </div>
        <div class="col-4">
            <div class="row">
                <div class="col-12">
                    <h4>Trust score: 
                        <i class="fas fa-star text-gray-300" />
                        <i class="fas fa-star text-gray-300" />
                        <i class="fas fa-star-half text-gray-300" />
                    </h4>
                </div>
                <div class="col-12">
                    {@html docMetadata}
                    <br/>
                    <small class="text-muted"><a href="#" >more information....</a></small>
                </div>
            </div>
        </div>
    </div>
    <div class="row top-space">
        <div class="col-12">
            <hr />
        </div>
    </div>
    <div class="row top-space">
        <div class="col-8">
            <h3>Summary</h3>
            <small class="text-muted">(this is automatically generated, <a href="#">learn more...</a>)</small>
            <p/>
            <p>
                {@html summarizedHTML}
            </p>
            <button
            class="immersive-reader-button"
            data-style-button="iconAndText"
            data-locale="en"
            on:click={handleLaunchImmersiveReader}>
            Open in Immersive Reader
            </button>


        </div>
        <div class="col-4">
            <img id="avatar" alt="avatar" class="img img-responsive" src="/img/avatar.png" />
            <p>
            <a href="#"
            id="lookupButton"
            class="btn btn-large btn-info"
            on:click={handleDictionaryLookup}>What does that word mean? Please explain.</a>

        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <a href="/home" class="btn btn-dark">BACK....</a>
        </div>
    </div>
{/if} 

 

