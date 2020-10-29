<script>
    import utils from '../utils/auth-utils.js';
    
    export let title = "Claim your Badge here !"
    export let type = "learner";

    let qrUrl = `${utils.API}/get-badge?type=${type}&what=qr`;
    let badgerUrl = `${utils.API}/get-badge?type=${type}&what=badger`;

    export let props = {
      title,
      qrUrl,
      badgerUrl
    };
</script>


<style>

  .img-badger {
    width: 256px;
  }

  .img-qrcode {
    width: 256px;
  }
</style>


<!-- Start: Card Info -->
<div class="card shadow border-left-success py-2 h-100">
  <div class="card-body">
    <div class="row align-items-center no-gutters">
      <div class="col mr-2">
        <div class="text-uppercase text-info font-weight-bold text-xs mb-1">
          <span>{props.title}</span>
        </div>

        If you built your Hackathon project on Azure, you can claim your <b>Builder</b> Azure Hero here:

      </div>
    </div>
    <div class="row">
      <div class="col-6 h-50">
          <img class="img img-fluid img-qrcode" src="{props.qrUrl}" alt="" />
      </div>
      <div class="col-6 h-50">
          <img class="img img-fluid img-badger" src="{props.badgerUrl}" alt="" />
          Builder Badger
      </div>
      <div class="col-12 h-50">
        Just scan the QR code and follow the instructions. You can collect multiple badgers by learning, building and creating meaningful contributions to our Azure tech community.
      </div>

    </div>
  </div>
</div>
<!-- End: Card Info -->
