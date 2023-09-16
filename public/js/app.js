console.log("Client side javascript file. ");



const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')

messageOne.textContent = 'From app.js'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (eventObject) => {
    eventObject.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    console.log("Search clicked..." + search.value)
    let cityName = search.value

    fetch(`http://localhost:3000/weather?location=${cityName}`).then((data) => {
        // console.log(data)
        data.json().then((data) => {
            console.log(data)
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    }).catch((error) => {
        console.log(error)
    })
})


