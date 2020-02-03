document.addEventListener("DOMContentLoaded", () => {
    
    // SIDENAV
    let element = document.querySelectorAll(".sidenav");
    M.Sidenav.init(element);
    loadNav();

    // LOAD PAGE
    var page = window.location.hash.substr(1);
	if(page == '') page = 'matches';
	loadPage(page);


    // --- FUNCTION ---------------------------------

    // LOAD NAV
    function loadNav(){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status != 200) return;
            // ADD MENU
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
              elm.innerHTML = xhttp.responseText;
            });
            // MENU ON CLICK
            document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                elm.addEventListener("click", function (event) {
                    // Tutup sidenav
                    var sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    // Muat konten halaman yang dipanggil
                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
          }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    // LOAD PAGE
    function loadPage(page){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4){
                let content = document.getElementById("body-content");
                if(this.status == 200){
                    if(page == 'matches'){
                        matchAPI()
                    }else if(page == 'teams'){
                        teamAPI()
                    }else if(page == 'favorites'){
                        getFavorite()
                    }
                    content.innerHTML = xhttp.responseText;
                }else if(this.status == 404){
                    content.innerHTML = "<p>Halaman tidak ditemukan</p>";
                }else{
                    content.innerHTML = "<p>Halaman tidak dapat diakses</p>";
                }
            }
        }
        xhttp.open("GET", "pages/" + page + ".html", true); // GET HTML PAGES
        xhttp.send();
    }

})