/* -------------------------------- ALL CONST ------------------------------- */
const urlMatch = 'https://api.football-data.org/v2/competitions/2021/matches';
const urlTeam = 'https://api.football-data.org/v2/competitions/2021/teams';
const apiKey = '710569450d5e4212a936b3c8c2beb2f8';

/* ----------------------------- CONVERT TO JSON ---------------------------- */
function json(response) {
    return response.json();
}

/* ------------------------------ CHECK STATUS ------------------------------ */
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}