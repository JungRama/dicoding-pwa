const urlTeam = 'https://api.football-data.org/v2/competitions/2021/teams';
const urlMatch = 'https://api.football-data.org/v2/competitions/2021/matches';
const apiKey = '02194bb123d44e9895fd716647c05a53';

function json(response) {
    return response.json();
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function error(error) {
    console.log("Error : " + error);
}

function getMatchList() {

    if ('caches' in window) {
        caches.match(urlMatch).then(function (response) {

            if (response) {
                console.log('pake cache');
                response.json().then(function (data) {
                    var matches = "";
                    data.matches.forEach(function (match) {

                        matches += `
                        <div class="col m6 s12 card ">
                            <br>
                            <div class="center"><small><b>${match.homeTeam.name} vs ${match.awayTeam.name}</b></small></div>
                            <div class="center">${match.utcDate.split("T")[0]}</div>
                            <div class="center">${match.utcDate.split("T")[1].slice(0, 5)}</div>
                            <br>
                        </div>`

                        document.getElementById("match-list").innerHTML = matches;
                    })
                })
                return false;

            }
        })
    }

    fetch(urlMatch, {
        headers: {
            'X-Auth-Token': apiKey
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {

            const jsonResponse = new Response(JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json'
                }
            });

            caches.open('cache').then(cache => cache.put(urlMatch, jsonResponse));

            var matches = "";
            data.matches.forEach(function (match) {

                matches += `
                    <div class="col m6 s12 card ">
                        <br>
                        <div class="center"><small><b>${match.homeTeam.name} vs ${match.awayTeam.name}</b></small></div>
                        <div class="center">${match.utcDate.split("T")[0]}</div>
                        <div class="center">${match.utcDate.split("T")[1].slice(0, 5)}</div>
                        <br>
                    </div>`
                document.getElementById("match-list").innerHTML = matches;
            })
        })
}

function getTeamList() {
    if ('caches' in window) {
        caches.match(urlTeam).then(function (response) {

            if (response) {
                console.log('pake cache');
                response.json().then(function (data) {
                    var listTeam = "";
                    data.teams.forEach(function (team) {
                        team.crestUrl = team.crestUrl.replace('http://', 'https://');
                        //console.log(team.crestUrl);
                        listTeam += ` 
                                      
                            <div class="col m6 s12 card">
                                <div class="row valign-wrapper">
                                    <div class="col m4 s4 center">
                                        <br>
                                        <img src="${team.crestUrl}" alt="" style="height:50px;" class="rounded responsive-img">
                                    </div> 
                                    <div class="col m8 s8">
                                        <span class="black-text">
                                            ${team.name}
                                        </span> <br>
                                        <button id="save_button" onclick="addFavorite('${team.id}' , '${team.name}', '${team.crestUrl}')" class="btn btn-small green">Favorite</button>   
                                    </div> 
                                    
                                </div>
                            </div>
                
                            `
                        document.getElementById("team-list").innerHTML = listTeam;
                    })
                })
                return false;

            }
        })
    }

    fetch(urlTeam, {
        headers: {
            'X-Auth-Token': apiKey
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {


            const jsonResponse = new Response(JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json'
                }
            });

            caches.open('cache').then(cache => cache.put(urlTeam, jsonResponse));

            var listTeam = "";
            data.teams.forEach(function (team) {

                team.crestUrl = team.crestUrl.replace('http://', 'https://');

                var fileCache = [
                    team.crestUrl
                ];
                caches.open('cache').then(cache => cache.addAll(fileCache));

                listTeam += ` 

                    <div class="col m6 s12 card">
                        <div class="row valign-wrapper">
                            <div class="col m4 s4 center">
                                <br>
                                <img src="${team.crestUrl}" alt="" style="height:50px;" class="rounded responsive-img">
                            </div> 
                            <div class="col m8 s8">
                                <span class="black-text">
                                    ${team.name}
                                </span> <br>
                                <button id="save_button" onclick="addFavorite('${team.id}' , '${team.name}', '${team.crestUrl}')" class="btn btn-small green">Favorite</button>   
                            </div> 

                        </div>
                    </div>

                            `
                document.getElementById("team-list").innerHTML = listTeam;
            })
        })
}

function getFavoriteTeam() {
    getAllTeam().then(function (teams) {
        var teamHTML = ""
        teams.forEach(function (team) {
            teamHTML += `    
                    <div class="col m6 s12 card">
                    <div class="row valign-wrapper">
                        <div class="col m4 s4 center">
                            <br>
                        <img src="${team.img}" alt=""  style="height:50px;" class="rounded responsive-img">
                    </div>
                    <div class="col m8 s8">
                                        <span class="black-text">
                                            ${team.name}
                                        </span> <br>
                        <button onclick="delFavorite('${team.ID}')" class="btn btn-danger red btn-small">Delete</button>
                    </div>
                    </div>
                </div>`

            document.getElementById("favorite-team").innerHTML = teamHTML
        })
    })
}