/* --------------------------- CREATE DATABASE --------------------------- */

let dbPromise = idb.open('perpustakaan', 1, function(db) {
    if (!db.objectStoreNames.contains('buku')) {
        let table = db.createObjectStore('buku', { keyPath: 'isbn' })
        table.createIndex('nomorInduk', 'nomorInduk', { unique: true })
        table.createIndex('judul', 'judul', { unique: false })
    }
})

/* ---------------------------------- CRUD ---------------------------------- */

// CREATE
dbPromise.then(db => {
    let tx = db.transaction('buku', 'readwrite')
    let store = tx.objectStore('buku')
    let item = {
        isbn: 1,
        judul : 'Menjadi orang hebat',
        description: 'Belajar menjadi orang hebat dalam hal hal kecil',
        created: new Date().getTime()
    }
    store.add(item)
    return tx.complete
})
.then(()=>{
    console.log('Berhasil Tambah');
})
.catch(err => {
    console.log(`Gagal : ${err}`);
})

// READ DATA -- ALL DATA
dbPromise.then(db => {
    let tx = db.transaction('buku', 'readonly')
    let store = tx.objectStore('buku')
    return store.getAll() 
    // IF ONE TO GET ONLY ONE DATA USE THIS 
    // CODE:: store.get(id);
}).then(function(items) {
    console.log('Data yang diambil: ')
    console.log(items)
});

// READ DATA -- WITH CURSOR
dbPromise.then(function(db) {
    var tx = db.transaction('buku', 'readonly');
    var store = tx.objectStore('buku');
    return store.openCursor();
}).then(function ambilBuku(cursor) {
    if (!cursor) {
        return;
    }
    console.log('Posisi cursor: ', cursor.key);
    for (var field in cursor.value) {
        console.log(cursor.value[field])
    }
    return cursor.continue().then(ambilBuku)
}).then(function() {
    console.log('Tidak ada data lain.')
});

// UPDATE 
dbPromise.then(function(db) {
    let tx = db.transaction('buku', 'readwrite')
    let store = tx.objectStore('buku')
    let item = {
        judul: 'Menjadi Android Developer Expert (MADE)',
        isbn: 1,
        description: 'Belajar pemrograman Android di Dicoding dengan modul online dan buku.',
        created: new Date().getTime()
    };
    store.put(item); //menambahkan KEY
    return tx.complete;
}).then(function() {
    console.log('Buku berhasil disimpan.')
}).catch(function() {
    console.error('Buku gagal disimpan.')
})

// DELETE
dbPromise.then(function(db) {
    var tx = db.transaction('store', 'readwrite');
    var store = tx.objectStore('store');
    store.delete('1');
    return tx.complete;
}).then(function() {
    console.log('Item deleted');
});