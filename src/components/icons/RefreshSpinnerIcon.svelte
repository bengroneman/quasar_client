<script>
  import RefreshIcon from './RefreshIcon.svelte';
  export let color = '#FF3E00';
  export let unit = 'px';
  export let duration = '4s';
  export let size = '60';
  export let stroke = +size / 12 + unit;
</script>

<span class="wrapper">
  <RefreshIcon
    style="--size: {size}{unit}; --color: {color}; --stroke: {stroke}; --floatSize: {size}; --duration: {duration}"
  />
</span>

<style>
  .wrapper {
    animation: 3s spinLine;
  }
  @keyframes spinLine {
    0% {
      transform: rotate(-20deg);
      height: 5px;
      width: 75px;
    }
    5% {
      height: 5px;
      width: 75px;
    }
    30% {
      transform: rotate(380deg);
      height: 5px;
      width: 75px;
    }
    40% {
      transform: rotate(360deg);
      height: 5px;
      width: 75px;
    }
    55% {
      transform: rotate(0deg);
      height: 5px;
      width: 5px;
    }
    65% {
      transform: rotate(0deg);
      height: 5px;
      width: 85px;
    }
    68% {
      transform: rotate(0deg);
      height: 5px;
    }
    75% {
      transform: rotate(0deg);
      height: 5px;
      width: 1px;
    }
    78% {
      height: 5px;
      width: 5px;
    }
    90% {
      height: 5px;
      width: 75px;
      transform: rotate(0deg);
    }
    99%,
    100% {
      height: 5px;
      width: 75px;
      transform: rotate(-20deg);
    }
  }
</style>
