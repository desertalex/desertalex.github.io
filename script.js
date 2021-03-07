limit = 10;
originalUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=' + limit;
nextUrl = '';
previousUrl = ''
count = 0;


const loadOriginal = () => {
    load(originalUrl);
}

const loadNext = () => {
    if (nextUrl) {
        removePokemon();
        load(nextUrl);
    }
}

const loadPrevious = () => {
    if (previousUrl) {
        removePokemon();
        load(previousUrl);
    }
}

const load = (url) => {
    console.log(url);
    fetch(url)
        .then(result => {
            return result.json();
        })
        .then(data => {
            console.log(data); // Remove before submission
            // get next and previous urls
            nextUrl = data.next;
            previousUrl = data.previous;
            count = data.count;
            console.log(count);

            // find where to place pokemon
            const div = document.getElementById('pokemon');

            // place pokemon in div
            for (num in data.results) {
                const result = data.results[num];
                const a = document.createElement('a')
                a.href = result.url;
                a.appendChild(document.createTextNode(result.name))
                div.appendChild(a);
                div.appendChild(document.createElement('br'));
            }

            // configure button opacity if not usable
            previousButton = document.getElementById('previousButton');
            nextButton = document.getElementById('nextButton');
            if (previousUrl) {
                previousButton.style.opacity = '1'
            } else {
                previousButton.style.opacity = '0.5'
            }

            if (nextUrl) {
                nextButton.style.opacity = '1'
            } else {
                nextButton.style.opacity = '0.5';
            }
        })
        .catch(err => {
            console.log(err);
        })
};

const loadLast = () => {
    offset = count - limit;
    url = 'https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=' + limit;
    removePokemon();
    load(url);
}

const removePokemon = () => {
    parent = document.getElementById('pokemon')
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
