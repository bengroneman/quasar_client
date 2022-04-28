<script>
    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';

    Chart.register(...registerables);

    export let metrics;
    export let goal;
    let canvasElement;
    onMount(() => {
        const ctx = canvasElement.getContext('2d');
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Oct', 'Dec']
        const _chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Metric #\'s',
                        data: metrics,
                        backgroundColor: [
                            '#e879f9',
                        ],
                        borderColor: [
                            '#c026d3',
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Goal',
                        data: labels.map(() => goal),
                        backgroundColor: [
                            '#4ade80',
                        ],
                        borderColor: [
                            '#16a34a',
                        ],
                        borderWidth: 1
                    },
                ]
            },
            options: {
                scales: {
                    y: {
                        startAtZero: true
                    }
                }
            }
        });
    });
</script>
<canvas bind:this={canvasElement}></canvas>
