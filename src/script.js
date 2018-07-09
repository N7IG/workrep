const { fromEvent, from } = rxjs;
const { map, flatMap, filter, debounce, debounceTime } = rxjs.operators;

const API_KEY = '660d1e709203ad9b26312e529d82fd42';
let requestSearchBase = 'https://api.themoviedb.org/3/search';
let requestBase = 'https://api.themoviedb.org/3';

let searchButton = document.querySelector('.query-submit');
let searchInput = document.querySelector('.query-input');
let resultList = document.querySelector('.result-list');

function makeQueryUrl() {
    //PROBABLY SHOULD BE IN THE PIPE
    refreshList();
    return `${requestSearchBase}/movie?api_key=${API_KEY}&query=${searchInput.value}`;
}

function makeDetailUrl(mId) {
    return `${requestBase}/movie/${mId}?api_key=${API_KEY}`;
}

function getObservableResponse(requestUrl) {
    var fetchPromise = fetch(requestUrl)
        .then(response => response.json());
    return from(fetchPromise);
}

function makeCastQueryUrls(resultArray) {
    let castUrlArray = [];
    let tmpUrl = null;
    for (var i = 0; i < resultArray.results.length; i++) {
        tmpUrl = `${requestBase}/movie/${resultArray.results[i].id}?api_key=${API_KEY}&append_to_response=credits`;
        castUrlArray.push(tmpUrl);
    }
    return castUrlArray;
}

function getElementId(target){

    return target.parentNode.getAttribute('data-id');
}

function isTitle(target) {
    return target.tagName === 'H2';
}

// let searchStream = fromEvent(searchButton, 'click');
let searchStream = fromEvent(searchInput, 'keydown');

let requestStream = searchStream.pipe(debounceTime(250), map(makeQueryUrl), flatMap(getObservableResponse), flatMap(makeCastQueryUrls), flatMap(getObservableResponse));

requestStream.subscribe(function(movJSON){
    // console.log(movJSON);
    displayElement(movJSON);
}, function(){
    console.log('error');
}, function(){
    console.log('3');
});

let movieStream = fromEvent(resultList, 'click')
    .pipe(map(event => event.target), filter(isTitle), map(getElementId), map(makeDetailUrl), flatMap(getObservableResponse));

movieStream.subscribe(function(item){
    // console.log(item);   
    updateDetails(item);
});

//TODO: first detail