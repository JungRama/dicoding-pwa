var dbPromised = idb.open("competitions", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("favorite")) {
        upgradeDb.createObjectStore("favorite", { keyPath: "ID" });
    }
})


function addFavorite(id, name, img) {
    dbPromised.then(function (db) {
        var tx = db.transaction("favorite", "readwrite")
        var store = tx.objectStore("favorite")
        var data = {
            ID: id,
            name: name,
            img: img
        }
        store.add(data)
        return tx.complete
    }).then(function () {
        M.toast({ html: 'Berhasil tambah di favourite' })
    })
}

function delFavorite(id) {
    dbPromised.then(function (db) {
        var tx = db.transaction("favorite", "readwrite")
        var store = tx.objectStore("favorite")
        store.delete(id)
        return tx.complete
    }).then(function () {
        M.toast({ html: 'Berhasil menghapus data tim di favourite' })
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    })
}

function getAllTeam() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("favorite", "readonly")
                var store = tx.objectStore("favorite")
                return store.getAll()
            })
            .then(function (teams) {
                resolve(teams)
            })
    })
}
