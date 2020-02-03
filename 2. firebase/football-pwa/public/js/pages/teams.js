// NOTE : ALL API SETTING ON => setting.js

/* --------------------- CALL AND INIT DATA ON COMPONENT -------------------- */
function teamAPI(params) {
    if('caches' in window){
        caches.match(urlTeam)
        .then(response => {
            if(response){
                response.json()
                .then(data => {
                    let teams = ''
                    data.teams.forEach(team => {
                        teams += `
                        <div class="col m4 s12">
                            <div class="card horizontal" style="min-height: 270px;">
                                <div class="card-image" style="padding: 20px 0px 0px 20px;">
                                    <img src="${team.crestUrl}" style="height: 50px;">
                                </div>
                                <div class="card-stacked">
                                    <div class="card-content">
                                        <p><b style="color: #3d5afe;">${team.name}</b></p>
                                        <table>
                                            <tr>
                                                <td>Founded</td>
                                                <td> ${team.founded==null?'-':team.founded}</td>
                                            </tr>
                                            <tr>
                                                <td>Venue</td>
                                                <td> ${team.venue==null?'-':team.venue}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="card-action">
                                        <button class="btn indigo accent-3 lighten-1"
                                        onclick="addToFavorite(this, '${team.id}', '${team.crestUrl}', '${team.name}', '${team.founded}', '${team.venue}')"
                                        >Add to favorite</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    })
                    document.getElementById("content-teams").innerHTML = teams;
                    
                    // HIDE LOADER
                    document.getElementById("content-loader").style.display = "none"
                })
            }else{
                callAPIteam()
            }
        })
    }
}

/* -------------------------------- CALL API -------------------------------- */
function callAPIteam(){
    fetch(urlTeam, {
        headers: {'X-Auth-Token': apiKey}
    })
    .then(status)
    .then(json)
    .then(function (data) {
        const dataJson = new Response(JSON.stringify(data), {
            headers: {'content-type': 'application/json'}
        });

        // workbox.routing.registerRoute(
        //     dataJson,
        //     workbox.strategies.staleWhileRevalidate({
        //         cacheName: urlTeam
        //     })
        // );

        // caches.open('pwa-football-v1-submission')
        //     .then(cache => cache.put(urlTeam, dataJson))

        let teams = ''
        data.teams.forEach(team => {
            teams += `
            <div class="col m4 s12">
                <div class="card horizontal" style="min-height: 270px;">
                    <div class="card-image" style="padding: 20px 0px 0px 20px;">
                        <img src="${team.crestUrl}" style="height: 50px;">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <p><b style="color: #3d5afe;">${team.name}</b></p>
                            <table>
                                <tr>
                                    <td>Founded</td>
                                    <td> ${team.founded==null?'-':team.founded}</td>
                                </tr>
                                <tr>
                                    <td>Venue</td>
                                    <td> ${team.venue==null?'-':team.venue}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="card-action">
                            <button class="btn indigo accent-3 lighten-1"
                            onclick="addToFavorite(
                                this,
                                ${team.crest},
                                ${team.name},
                                ${team.founded},
                                ${team.venue}
                            )"
                            >Add to favorite</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
        document.getElementById("content-teams").innerHTML = teams;
        
        // HIDE LOADER
        document.getElementById("content-loader").style.display = "none"
    })
}