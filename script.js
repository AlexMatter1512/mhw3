mv_key = 'EzuMS8qxUYdInQJntuW3xdyGS01jEI18phlFCx72'
const button = document.getElementById("search_button");
const album = document.getElementById("album-view");
const input = document.getElementById("content");
const modal = document.getElementById("infoModal")
//se viene premuto enter viene triggerato l'evento 'click' sul pulsante del form
input.addEventListener("keypress", onEnter); 
function onEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search_button").click();
  }
}

button.addEventListener('click', search)
function search(event)
{
	// Leggo il valore del campo di testo
	const content = document.querySelector('#content').value;

	// verifico che sia stato effettivamente inserito del testo
	if(content) {
	    const text = encodeURIComponent(content);
		console.log('Eseguo ricerca elementi riguardanti: ' + text);

        // Esegui fetch
        let url = 'https://api.watchmode.com/v1/autocomplete-search/?apiKey='+ mv_key + '&search_field=name&search_value=' + content + '&search_type=2';

        fetch(url, { method: 'Get' })
            .then((res) => res.json())
            .then(buildAlbum);
    }
}

function buildAlbum(json) {
    //se sono gia presenti elementi nella 'album view' vengono rimossi prima di aggiungere quelli della nuova ricerca
    while (album.firstChild) {
        album.removeChild(album.lastChild);
    }

    console.log(json);
    let albumDivs = new Array();
    for (const movie of json.results) {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = movie.image_url;
        img.alt = "This movie doesn't have a cover"
        div.append(movie.name);
        div.appendChild(img);
        div.classList.add("album-item");
        div.dataset.movieId = movie.id;
        div.dataset.movieImg = movie.image_url;
        album.appendChild(div);
        albumDivs.push(div);
    }
    console.log(albumDivs);

    albumDivs.forEach(element => {
        element.addEventListener('click', showInfo);
    });
}

function showInfo(event) {
    const movieDiv = event.currentTarget;
    const div = document.getElementById("modalServices");
    while (div.firstElementChild != div.lastElementChild){
        div.removeChild(div.lastChild);
    }
    
    let url = 'https://api.watchmode.com/v1/title/' + movieDiv.dataset.movieId + '/details/?apiKey='+ mv_key + '&append_to_response=sources';
    fetch(url, { method: 'Get' })
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            json.sources.forEach(element => {
                let source = document.createElement("a");
                source.append(element.name);
                source.href = element.web_url;
                if (div.lastElementChild.innerHTML != source.innerHTML){
                    div.appendChild(source);
                }
            });
    });

    modalImg.src = movieDiv.dataset.movieImg;
    infoModal.style.display="flex";

}

window.onclick = function(event) {
    if (event.target == infoModal) {
        console.log("chiudo")
      infoModal.style.display = "none";
    }
  }

document.querySelector(".close").addEventListener("click", function(event) {
    infoModal.style.display = "none";
})