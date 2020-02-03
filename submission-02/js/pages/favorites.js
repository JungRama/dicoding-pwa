/* ------------------------- ADD DATABASE AND TABLE ------------------------- */
var database = idb.open('football-data', 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("favorite")) {
        upgradeDb.createObjectStore('favorite', { keyPath: 'id' });
    }
})

/* ----------------------------- ADD TO FAVORITE ---------------------------- */
function addToFavorite(id, image, name, founded, venue){
    database.then(db => {
        let tx = db.transaction('favorite', 'readwrite')
        let store = tx.objectStore('favorite')
        let data = {
            id: id,
            image: image,
            name: name,
            founded: founded,
            venue: venue
        }

        store.add(data)
        return tx.complete
    }).then(() => {
        M.toast({html: 'Success added to favorite!'})
    })
}

/* -------------------------- REMOVE FROM FAVORITE -------------------------- */
function removeFromFavorite(id) {
    database.then(db => {
        let tx = db.transaction('favorite', 'readwrite')
        let store =  tx.objectStore('favorite')
        
        store.delete(id)
        return tx.complete
    }).then(() =>{
        M.toast({html: 'Success remove from favorite!'})
        getFavorite()
    })
}

/* ------------------------------ GET FAVORITE ------------------------------ */
function getFavorite() {
    database.then(db => {
        let tx = db.transaction('favorite', 'readonly')
        let store =  tx.objectStore('favorite')

        return store.getAll()
    }).then(data => {
        let teams = ''
        data.forEach(team => {
            teams += `
            <div class="col m4 s12">
                <div class="card horizontal">
                    <div class="card-image" style="padding: 20px 0px 0px 20px;">
                        <img src="${team.image}" style="height: 50px;">
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
                            onclick="removeFromFavorite('${team.id}', '${team.crestUrl}', '${team.name}', '${team.founded}', '${team.venue}')"
                            >Remove</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        })

        if(teams == ''){
            document.getElementById("content-favorite").innerHTML = `<h5 style="text-align:center">NO FAVORITE TEAM</h5>`;
        }else{
            document.getElementById("content-favorite").innerHTML = teams;
        }
        
        // HIDE LOADER
        document.getElementById("content-loader").style.display = "none"
    })
}
