const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
console.log( 'Js loaded' )

const wrapper = document.querySelector( '.wrapper' )
searchInput = wrapper.querySelector( 'input' )
infoText = wrapper.querySelector( '.info-text' )
volumeIcon = wrapper.querySelector( '.word i' )
removeIcon = wrapper.querySelector( '.search span' )

// data function
function data ( result = 'a', word = 'a' ) {
    if ( result.title ) {
        infoText.innerHTML = ''
    } else {
        console.log( result );
        wrapper.classList.add( "active" )
        let definitions = result[ 0 ].meanings[ 0 ].definitions[ 0 ]
        // phonetics = `${ result[ 0 ].meanings[ 0 ].partOfSpeach } /${ result[ 0 ].phonetics[ 0 ].text }/`
        console.log( definitions );
        // data a elemento html
        //document.querySelector( ".word p" ).innerText = result[ 0 ].word;
        //document.querySelector( ".word span" ).innerText = phonetics;
        document.querySelector( ".meaning span" ).innerText = definitions.definition;
        document.querySelector( ".example span" ).innerText = definitions.example;
        document.querySelector( ".synonyms span" ).innerText = definitions.synonyms;
        audio = new Audio( "https:" + result[ 0 ].phonetics[ 0 ].audio );
        //     if ( definitions.synonyms[ 0 ] === undefined ) {
        //         synonyms.parentElement.style.display = "none";

        //   } else {
        //        synonyms.parentElement.style.display = "block";
        //         synonyms.innerHTML = "";
        //          for ( let i = 0; i < 5; i++ ) {
        //              let tag = `<span>${ definitions.synonyms[ i ] },</span>`;
        //             synonyms.insertAdjacentHTML( "beforeend", tag );
        //         }
        //      }
    }
}
// Fetch api function
function fetchApi ( word ) {
    infoText.innerHTML = `Searching the meaning of <span> ${ word }</span>`
    infoText.style.color = "#000";
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${ word }`;
    fetch( url ).then( res => res.json() ).then( result => data( result, word ) );
}


searchInput.addEventListener( 'keyup', e => {
    if ( e.key === 'Enter' && e.target.value ) {
        fetchApi( e.target.value )
    }
} );

volumeIcon.addEventListener( 'click', () => {
    audio.play();
} )

removeIcon.addEventListener( 'click', () => {
    searchInput.value = "";
    searchInput.focus();
} )
