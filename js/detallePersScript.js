function getCharacter(){
    const url = window.location.href;
    console.log(url)
    const params = new URLSearchParams(window.location.search);
    let object = params.get('personaje');
    console.log(object)
}
getCharacter();