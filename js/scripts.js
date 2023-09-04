window.addEventListener('load',()=>{
    const $zipcodeButton = document.getElementById('app__zipcode__button')
    const $adicionarPost = document.getElementById('adicionarPost')
    $zipcodeButton.addEventListener('click',handleSubmit)
    $adicionarPost.addEventListener('click',handleAdd)
})

function handleSubmit(e) {
    e.preventDefault()
    const cepInput = document.getElementById('cep-input')
    const cepInputValue = cepInput.value

    fetchPosts(cepInputValue)
}

function handleAdd(e) {
    e.preventDefault()
    const titleValue = document.getElementById('post__add__title')
    const bodyValue = document.getElementById('post__add__body')
    
    addPosts(titleValue, bodyValue)
}

function fetchPosts(id){
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
        renderResponse('[data-title]',data.title)
        renderResponse('[data-body]',data.body)
        showElementByid('adress')
    });
}

function addPosts(title, body){
    return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
            showElementByid('adicionado')
            console.log(data)
        });
}

// new XMLHttpRequest()
// http.open(method,url)
// http.send()
// http.onerror = () => {}
// http.onload = () => {}

function renderResponse(tagSelector, value){
    const $cep = document.querySelector(tagSelector)
    $cep.innerHTML=value
}

function showElementByid(id){
    const element = document.getElementById(id)
    element.setAttribute('data-visible','true')
}

function hideElementByid(id){
    const element = document.getElementById(id)
    element.setAttribute('data-visible','false')
}

function handleError(){
    hideElementByid('load')
    showElementByid('error')
}