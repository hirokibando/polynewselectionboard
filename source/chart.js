function updateVoteChart() {
    const demChartBar = document.getElementById('demSlope');
    const repChartBar = document.getElementById('repSlope');

    const totalPossibleVotes = 400;

    const demPercent = Math.max(15, (democratVotes / totalPossibleVotes) * 100);
    const repPercent = Math.max(15, (republicanVotes / totalPossibleVotes) * 100);

    demChartBar.style.height = `${demPercent}%`;
    repChartBar.style.height = `${repPercent}%`;
}

function calculateTotalPossibleVotes() {
    let total = 0;
    const states = document.querySelectorAll('.us-state-map path, .us-state-map circle');
    states.forEach(state => {
        total += parseInt(state.dataset.votes) || 0;
    });
    return total;
}

updateVoteChart();

