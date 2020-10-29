<script>
    export let icon = "fa-map-marker-alt" // fa-route fa-receipt fa-shopping-cart
    export let border = "info" // success info ...
    export let smallTitle = "Small Title"
    export let bigTitle = "Big Title"
    export let links = undefined;

    export let props = {
      icon,
      border,
      smallTitle,
      bigTitle,
      links
    };



</script>

<style>
  .list-bottom {
    position : absolute;
    bottom   : 20px;
  }
</style>


<!-- Start: Card Info -->
<div class="card shadow border-left-{props.border} py-2 h-100">
  <div class="card-body">
    <div class="row align-items-center no-gutters">
      <div class="col mr-2">
        <div class="text-uppercase text-info font-weight-bold text-xs mb-1">
          <span>{props.smallTitle}</span>
        </div>
        <div class="row no-gutters align-items-center">
          <div class="col-auto">
            <div class="text-dark font-weight-bold h5 mb-0 mr-3">
              <span>{props.bigTitle}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-auto">
        <i class="fas {props.icon} fa-2x text-gray-300" />
      </div>
    </div>
    <div class="row h-100">
      <div class="col-12 h-100">
        <p>&nbsp;</p>
        <div class="h-100 pb-5">
          <slot>
            No Content provided !
          </slot>
          <p>&nbsp;</p>

          {#if props.links}
            <ul class="list-inline list-bottom">
              {#each props.links as link}
              <li class="list-inline-item">|| <a href="{link.href}">{link.text}</a> </li>
              {/each}
            </ul>
          {/if}

        </div>
      </div>
    </div>
  </div>
</div>
<!-- End: Card Info -->
