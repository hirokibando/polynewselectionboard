function changeElectionColors() {
    democratVotes = 0;
    republicanVotes = 0;

    const blueSafeStates = [
        "california", "colorado", "connecticut", "delaware", "dc", "hawaii", "illinois", "maryland",
        "massachusetts", "minnesota", "new-hampshire", "new-jersey", "new-mexico", "new-york", "oregon", "rhode-island",
        "vermont", "washington"
    ];

    const blueSwingStates = [
        "michigan", "nevada", "virginia", "wisconsin", "georgia", "pennsylvania", "arizona"
    ];

    const redSafeStates = [
        "alabama", "alaska", "arkansas", "idaho", "indiana", "kansas", "kentucky", "louisiana", "mississippi",
        "missouri", "montana", "north-dakota", "oklahoma", "south-carolina", "south-dakota",
        "tennessee", "texas", "utah", "west-virginia", "wyoming"
    ];

    const redSwingStates = [
        "florida", "iowa", "north-carolina", "ohio"
    ];

    const splitStates = {
        "maine": { dem: 3, rep: 1 },
        "nebraska": { dem: 1, rep: 4 }
    };

    blueSafeStates.forEach(stateCode => {
        const stateElement = document.getElementById(stateCode);
        if (stateElement) {
            stateElement.style.fill = colors[1];
            stateElement.dataset.colorIndex = 1;

            const votes = parseInt(stateElement.dataset.votes) || 0;
            democratVotes += votes;
        }
    });

    blueSwingStates.forEach(stateCode => {
        const stateElement = document.getElementById(stateCode);
        if (stateElement) {
            stateElement.style.fill = colors[2];
            stateElement.dataset.colorIndex = 2;

            const votes = parseInt(stateElement.dataset.votes) || 0;
            democratVotes += votes;
        }
    });

    redSafeStates.forEach(stateCode => {
        const stateElement = document.getElementById(stateCode);
        if (stateElement) {
            stateElement.style.fill = colors[3];
            stateElement.dataset.colorIndex = 3;

            const votes = parseInt(stateElement.dataset.votes) || 0;
            republicanVotes += votes;
        }
    });

    redSwingStates.forEach(stateCode => {
        const stateElement = document.getElementById(stateCode);
        if (stateElement) {
            stateElement.style.fill = colors[4];
            stateElement.dataset.colorIndex = 4;

            const votes = parseInt(stateElement.dataset.votes) || 0;
            republicanVotes += votes;
        }
    });

    Object.entries(splitStates).forEach(([stateCode, split]) => {
        const stateElement = document.getElementById(stateCode);
        if (stateElement) {
            if (split.dem > 0 && split.rep > 0) {
                stateElement.style.fill = PURPLE;
                stateElement.dataset.colorIndex = -1;
            } else if (split.dem > split.rep) {
                stateElement.style.fill = colors[1];
                stateElement.dataset.colorIndex = 1;
            } else {

                stateElement.style.fill = colors[3];
                stateElement.dataset.colorIndex = 3;
            }

            stateElement.dataset.demVotes = split.dem;
            stateElement.dataset.repVotes = split.rep;
            democratVotes += split.dem;
            republicanVotes += split.rep;
        }
    });
    updateVoteCounts();
}