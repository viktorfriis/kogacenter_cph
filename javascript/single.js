 //Søger i adresselinjen efter ordet "id" og sætter konstanten id lig med
 const urlParams = new URLSearchParams(window.location.search);
 const id = urlParams.get("id");

 console.log(id);

 let bike;

 const descTab = document.querySelector("#desc_tab");
 const desc = document.querySelector("#desc");

 const specTab = document.querySelector("#spec_tab");
 const specs = document.querySelector("#specs");


 let detail;


 document.addEventListener("DOMContentLoaded", start);

 function start() {
     getJson();

     descTab.addEventListener("click", openTab);
     specTab.addEventListener("click", openTab);

     document.querySelector(".cta").addEventListener("click", openForm);
 }

 async function getJson() {
     console.log("getJson");

     //Henter nu kun JSON data for den enkelte post jeg har klikket på
     const url = "https://viktorkjeldal.dk/kea/2sem/kogacenter_cph/wordpress/wp-json/wp/v2/cykel/" + id;
     const jsonData = await fetch(url);
     bike = await jsonData.json();

     console.log(bike);

     showBike();
 }

 function showBike() {
     document.querySelector("title").textContent = "Kogacenter | " + bike.kategori + " | " + bike.title.rendered;
     document.querySelector('meta[name="description"]').setAttribute("content", bike.meta_description);

     document.querySelector(".s_bike_img").src = bike.billede.guid;
     document.querySelector(".s_bike_img").alt = bike.alt_tag;
     document.querySelector(".s_model").textContent = "KOGA " + bike.model;
     document.querySelector(".s_color").textContent = "Farve: " + bike.farve;
     document.querySelector(".s_weight").textContent = "Vægt: " + bike.weight + " kg";

     if (bike.ny_pris == "") {
         document.querySelector(".s_pris").textContent = bike.pris + " DKK";
         document.querySelector(".s_pris").style.textDecoration = "none";
         document.querySelector(".s_pris").style.color = "black";
     } else {
         document.querySelector(".s_pris").style.fontWeight = "100";
         document.querySelector(".s_pris").textContent = bike.pris + " DKK";
         document.querySelector(".s_tilbud_pris").textContent = bike.ny_pris + " DKK";
     }

     document.querySelector("#desc p").textContent = bike.lang_1;
     document.querySelector("#desc p+p").textContent = bike.lang_2;
     document.querySelector("#desc p+p+p").textContent = bike.lang_3;

     document.querySelector("#specs ul li").textContent = bike.spec_1;
     document.querySelector("#specs ul li+li").textContent = bike.spec_2;
     document.querySelector("#specs ul li+li+li").textContent = bike.spec_3;
     document.querySelector("#specs ul li+li+li+li").textContent = bike.spec_4;
     document.querySelector("#specs ul li+li+li+li+li").textContent = bike.spec_5;
     document.querySelector("#specs ul li+li+li+li+li+li").textContent = bike.spec_6;

     document.querySelector(".book_link").href = "cykel.html?id=" + bike.id + "#booking";

     document.querySelector(".check_name").textContent = "KOGA " + bike.model;

     document.querySelector(".s_bike_img").addEventListener("load", () => {
         document.querySelector(".single_loader").style.display = "none";
     })

     document.querySelector("#back_btn").addEventListener("click", () => {
         history.back();
     })

     document.querySelector(".popup_img").src = bike.billede.guid;
     document.querySelector(".popup_img").alt = bike.alt_tag;

     const popup = document.querySelector(".popup");

     document.querySelector(".s_bike_img").addEventListener("click", () => {
         popup.style.display = "flex";
         document.querySelector("#close_btn").addEventListener("click", () => {
             popup.style.display = "none";
         })

         window.addEventListener("click", (event) => {
             if (event.target == popup) {
                 popup.style.display = "none";
             }
         })
     })
 }


 function openTab() {
     console.log("openTab");

     descTab.className = "tab_closed";
     specTab.className = "tab_closed";

     this.classList.add("tab_selected");

     detail = this.dataset.detail;

     desc.style.display = "none";
     specs.style.display = "none";

     console.log(detail);

     document.querySelector(detail).style.display = "block";
 }

 function openForm() {
     console.log("openForm");

     document.querySelector("#book").style.display = "block";

     document.querySelector("#book form").action = "mailto:viktorfriiskjeldal@gmail.com?Subject=Book%20en%20prøvetur%20på%20KOGA " + bike.model;

 }
