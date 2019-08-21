console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'from Loding...'
messageTwo.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value

    console.log(location)
    // for local host write localhost:port
    fetch('/weather?address='+location+'').then((response) => {

        response.json().then((data) => {
        if(data.error){
           return messageOne.textContent = data.error
        }

        messageOne.textContent = data.location
        messageTwo.textContent = data.temperature

        })
    })
})