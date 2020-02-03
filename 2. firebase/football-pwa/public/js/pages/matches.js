// NOTE : ALL API SETTING ON => setting.js

/* --------------------- CALL AND INIT DATA ON COMPONENT -------------------- */
function matchAPI(params) {
    if('caches' in window){
        caches.match(urlMatch)
        .then(response => {
            if(response){
                response.json()
                .then(data => {
                    let matches = ''
                    data.matches.forEach(match => {
                        matches += `
                        <div class="col m4 s12">
                            <div class="card" style="padding: 30px;">
                                <div class="center"><small><b style="color: #3d5afe;">${match.homeTeam.name} vs ${match.awayTeam.name}</b></small></div>
                                <div class="center">${match.utcDate.split("T")[0]}</div>
                                <div class="center">${match.utcDate.split("T")[1].slice(0, 5)}</div>
                            </div>
                        </div>
                        `
                    })
                    document.getElementById("content-matches").innerHTML = matches;
                    
                    // HIDE LOADER
                    document.getElementById("content-loader").style.display = "none"
                })
            }else{
                callAPImatch()
            }
        })
    }
}

/* -------------------------------- CALL API -------------------------------- */
function callAPImatch(){
    fetch(urlMatch, {
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
        //         cacheName: urlMatch
        //     })
        // );

        // caches.open('pwa-football-v1-submission')
        //     .then(cache => cache.put(urlMatch, dataJson))

        let matches = ''
        data.matches.forEach(function (match) {
            matches += `
                <div class="col m4 s12">
                    <div class="card" style="padding: 30px;">
                        <div class="center"><small><b style="color: #3d5afe;">${match.homeTeam.name} vs ${match.awayTeam.name}</b></small></div>
                        <div class="center">${match.utcDate.split("T")[0]}</div>
                        <div class="center">${match.utcDate.split("T")[1].slice(0, 5)}</div>
                    </div>
                </div>`
            document.getElementById("content-matches").innerHTML = matches
        })

        // HIDE LOADER
        document.getElementById("content-loader").style.display = "none"
    })
}