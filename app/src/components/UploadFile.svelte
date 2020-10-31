<script>
    import utils from '../utils/auth-utils.js';
    import Dropzone from "svelte-dropzone";

    const postUrl = files => {
        var targetUrl = `${utils.API}/file-upload`;
        console.log (`POST  ${targetUrl}`);
        return targetUrl;
    }

    const addedfile = file => {
        console.log(file);
    }

    const drop = event => {
        console.log(event.target);
    }

    const init = () => {
        console.log("dropzone init ! 😍");
    }
    const previewTemplate = `
    <div class="dz-preview dz-file-preview">
    <div class="dz-details">
      <div class="dz-filename"><span data-dz-name></span></div>
      <div class="dz-size" data-dz-size></div>
      <img data-dz-thumbnail />
    </div>
    <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
    <div class="dz-success-mark"><span>✔</span></div>
    <div class="dz-error-mark"><span>✘</span></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
    </div>`


    const options = { 
        url: postUrl,
        method: 'post',
        clickable: true, 
        acceptedFiles: 'image/*,application/pdf,.psd', 
        maxFilesize: 5, 
        previewTemplate,
        init 
    };

    function handleClick () {
        console.log ("Start Analysis...");

    }

</script> 
<style>
</style>




<div>
<Dropzone
    id="fileUpload"
    dropzoneEvents={{ addedfile, drop, init }}
    options={options}>
  </Dropzone>

    <button  on:click={handleClick} class="btn btn-primary">Upload and Analyze</button>


</div>

