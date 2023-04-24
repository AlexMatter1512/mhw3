mv_key = 'EzuMS8qxUYdInQJntuW3xdyGS01jEI18phlFCx72'
const form = document.querySelector('#search_content');
form.addEventListener('click', function(){
    console.log("ciao");
})

function search(event)
{
	event.preventDefault();
	// Leggo il valore del campo di testo
	const content = document.querySelector('#content').value;
  
	// verifico che sia stato effettivamente inserito del testo
	if(content) {
	    const text = encodeURIComponent(content);
		console.log('Eseguo ricerca elementi riguardanti: ' + text);

        // Esegui fetch
        let url = 'https://api.watchmode.com/v1/autocomplete-search/?apiKey='+ mv_key + '&search_field=name&search_value=' + content;

        fetch(url, { method: 'Get' })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                //let image = document.createElement(img);
                for (const movie of json.results) {
                    //console.log(movie.id);
                    let url = 'https://api.watchmode.com/v1/title/'+movie.id+'/details/?apiKey='+ mv_key +'';

                    fetch(url, { method: 'Get' })
                        .then((res) => res.json())
                        .then((json) => {
                            console.log(json);
                        });

                }
            });
    }
}