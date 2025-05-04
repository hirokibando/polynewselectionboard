function updateVoteCounts() {
    document.getElementById('demScore').textContent = democratVotes;
    document.getElementById('repScore').textContent = republicanVotes;

    updateVoteChart();
}

function setupNebraskaSplitControls() {
    const neDemInput = document.getElementById('ne-d');
    const neRepInput = document.getElementById('ne-r');
    const meDemInput = document.getElementById('me-d');
    const meRepInput = document.getElementById('me-r');

    neDemInput.addEventListener('input', updateNebraskaSplitVotes);
    neRepInput.addEventListener('input', updateNebraskaSplitVotes);
    meDemInput.addEventListener('input', updateMaineSplitVotes);
    meRepInput.addEventListener('input', updateMaineSplitVotes);


    function updateNebraskaSplitVotes() {
        const totalVotes = parseInt(nebraskaState.dataset.votes);
        const demVotes = parseInt(neDemInput.value) || 0;
        const repVotes = parseInt(neRepInput.value) || 0;

        democratVotes -= nebraskaState.dataset.demVotes ? parseInt(nebraskaState.dataset.demVotes) : 0;
        republicanVotes -= nebraskaState.dataset.repVotes ? parseInt(nebraskaState.dataset.repVotes) : 0;

        nebraskaState.dataset.demVotes = demVotes;
        nebraskaState.dataset.repVotes = repVotes;

        democratVotes += demVotes;
        republicanVotes += repVotes;

        if (demVotes > 0 && repVotes > 0) {
            nebraskaState.style.fill = PURPLE;
            nebraskaState.dataset.colorIndex = -1;
        } else if (demVotes > 0) {
            nebraskaState.style.fill = colors[1];
            nebraskaState.dataset.colorIndex = 1;
        } else if (repVotes > 0) {
            nebraskaState.style.fill = colors[3];
            nebraskaState.dataset.colorIndex = 3;
        } else {
            nebraskaState.style.fill = colors[0];
            nebraskaState.dataset.colorIndex = 0;
        }

        updateVoteCounts();
    }
    function updateMaineSplitVotes() {
        const totalVotes = parseInt(nebraskaState.dataset.votes);
        const demVotes = parseInt(meDemInput.value) || 0;
        const repVotes = parseInt(meRepInput.value) || 0;

        democratVotes -= maineState.dataset.demVotes ? parseInt(maineState.dataset.demVotes) : 0;
        republicanVotes -= maineState.dataset.repVotes ? parseInt(maineState.dataset.repVotes) : 0;

        maineState.dataset.demVotes = demVotes;
        maineState.dataset.repVotes = repVotes;

        democratVotes += demVotes;
        republicanVotes += repVotes;

        if (demVotes > 0 && repVotes > 0) {
            maineState.style.fill = PURPLE;
            maineState.dataset.colorIndex = -1;
        } else if (demVotes > 0) {
            maineState.style.fill = colors[1];
            maineState.dataset.colorIndex = 1;
        } else if (repVotes > 0) {
            maineState.style.fill = colors[3];
            maineState.dataset.colorIndex = 3;
        } else {
            maineState.style.fill = colors[0];
            maineState.dataset.colorIndex = 0;
        }

        updateVoteCounts();
    }
}

states.forEach(state => {
    state.dataset.colorIndex = 0;
    state.style.fill = colors[0];

    if (state.dataset.splitVotes === 'true') {
        return;
    }

    state.addEventListener('click', function () {
        const electoralVotes = parseInt(this.dataset.votes);
        const oldColorIndex = parseInt(this.dataset.colorIndex);

        if (oldColorIndex === 1 || oldColorIndex === 2) {
            democratVotes -= electoralVotes;
        } else if (oldColorIndex === 3 || oldColorIndex === 4) {
            republicanVotes -= electoralVotes;
        }

        const newColorIndex = (oldColorIndex + 1) % colors.length;
        this.dataset.colorIndex = newColorIndex;
        this.style.fill = colors[newColorIndex];

        if (newColorIndex === 1 || newColorIndex === 2) {
            democratVotes += electoralVotes;
        } else if (newColorIndex === 3 || newColorIndex === 4) {
            republicanVotes += electoralVotes;
        }

        updateVoteCounts();
    });
});

setupNebraskaSplitControls();