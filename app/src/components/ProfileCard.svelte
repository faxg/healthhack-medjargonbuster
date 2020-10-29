<script>
  import MD5 from "crypto-js/md5";

  export let userInfo = undefined;

  // reactive variables, gets updates whenever userInfo changes
  $: hash = MD5(userInfo.userDetails).toString();
  $: avatarImageUrl = `https://www.gravatar.com/avatar/${hash}?d=robohash&size=140`;
</script>

<style>

  .card-profile .card-img-top {
    border-radius: 0;
  }
  .card-profile .card-img-profile {
    max-width: 100%;
    border-radius: 50%;
    margin-top: -95px;
    margin-bottom: 35px;
    border: 5px solid #e6e5e1;
  }
  .card-profile .card-title {
    margin-bottom: 10px;
  }
  .card-profile .card-title small {
    display: block;
    font-size: 0.6em;
    margin-top: 0.2em;
  }
  .card-profile .card-links {
    margin-bottom: 25px;
  }
  .card-profile .card-links .fa {
    margin: 0 1em;
    font-size: 1.6em;
  }
</style>

<div class="card card-profile text-center">
  <img
    alt=""
    class="card-img-top"
    src="https://partner.microsoft.com/-/media/mssc/mpn/partner/solutions/images/azure-500x281-v2.ashx" />

  <div class="card-block">
    <img alt="" class="card-img-profile" src={avatarImageUrl} />
    <h4 class="card-title">
      {userInfo.userDetails}
      <small>Logged in via <b>{userInfo.identityProvider}</b></small>
    </h4>
    <div class="card-links">
      <a href="#"><i class="fab fa-github" /></a>
      <a class="fab fa-linkedin" href="#" />
      <a class="fab fa-twitter" href="#" />
      <a class="fab fa-facebook" href="#" />
    </div>
  </div>
</div>
