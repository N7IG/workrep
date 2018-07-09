let infoTitle = document.querySelector('.info-title');
let average = document.querySelector('.average');
let poster = document.querySelector('.mov-poster');
let description = document.querySelector('.mov-description');


function displayElement(movieJSON){
    // console.log(movieJSON);
    resultList.appendChild(constructElement(movieJSON.title, 'http://image.tmdb.org/t/p/w185/' + movieJSON.backdrop_path, movieJSON.credits.cast.slice(0, 3), movieJSON.id));
    let hr = document.createElement("hr");
    resultList.appendChild(hr);
}

function updateDetails(resp) {

    infoTitle.innerHTML = resp.title;
    average.innerHTML = resp.vote_average;
    poster.src = `http://image.tmdb.org/t/p/w500/${resp.backdrop_path}`
    description.innerHTML = resp.overview;
}

function constructElement(title, imgURL, castArray, movId){
    let actorNumber = 3;

    let resElm = document.createElement("li"); 
    resElm.setAttribute("data-id", movId);

    let titleEl = document.createElement("h2");
    titleEl.innerHTML = title;
    resElm.appendChild(titleEl);
    let imgWrapper = document.createElement("div");
    let imgEl = document.createElement("img");
    imgEl.src = imgURL;
    imgEl.classList.add('thumbnail');
    imgWrapper.appendChild(imgEl);
    resElm.appendChild(imgWrapper);
    let cast = document.createElement("hx");
    cast.innerHTML = "Cast:";
    resElm.appendChild(cast);

    let actorList = document.createElement("ul");
    let tmpLi = null;
    for (i = 0; i < actorNumber; i++) {
        tmpLi = document.createElement("li");
        tmpLi.innerHTML = castArray[i].name;
        actorList.appendChild(tmpLi);
    }

    let castBlock = document.createElement("div");
    castBlock.appendChild(cast);
    castBlock.appendChild(actorList);

    resElm.appendChild(castBlock);

    return resElm;
}