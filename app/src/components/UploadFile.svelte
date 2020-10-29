<script>
    import utils from '../utils/auth-utils.js';




    let uploadEnabled = true;

async function handleClick () {
    console.log ("File upload triggered");
    uploadEnabled = false;
    document.forms['uploadform'].submit();
}

</script> 

<div>
    <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>

    <form action="{utils.API}/file-upload" method="POST" target="dummyframe"
        class="dropzone"
        id="uploadform">
    </form>

    <button {uploadEnabled} on:click={handleClick} class="btn btn-primary">Upload and Analyze</button>


</div>