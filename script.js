mv_key = 'EzuMS8qxUYdInQJntuW3xdyGS01jEI18phlFCx72'
const button = document.querySelector('#search_button');
const album = document.querySelector('#album-view');
const input = document.getElementById("content");

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
    //se sono gia presenti elementi nella 'album view' vengono rimossi prima di aggiungere quelli della nuova ricerca
    while (album.firstChild) {
        album.removeChild(album.lastChild);
    }

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
            .then((json) => {
                console.log(json);
                for (const movie of json.results) {
                    let div = document.createElement("div");
                    let img = document .createElement("img");
                    img.src = movie.image_url;
                    img.alt = "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279"
                    div.append(movie.name);
                    div.appendChild(img);
                    div.classList.add("album-item");
                    album.appendChild(div);
                }

                //let image = document.createElement(img);
                /*for (const movie of json.results) {
                    //console.log(movie.id);
                    let url = 'https://api.watchmode.com/v1/title/'+movie.id+'/details/?apiKey='+ mv_key +'';

                    fetch(url, { method: 'Get' })
                        .then((res) => res.json())
                        .then((json) => {
                            console.log(json);
                        });

                }*/
                console.log(document.querySelectorAll(".album-item"));
            });

        
    }
}