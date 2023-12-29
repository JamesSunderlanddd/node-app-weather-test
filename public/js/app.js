const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputDataEl = document.querySelector('#input1');
  const url = `http://localhost:3000/weather?address=${inputDataEl.value}`
  getData(url)
})

const getData = async (url) => {
  const forecast = document.querySelector('#forecast')
  forecast.style.color = 'grey'
  forecast.textContent = 'Loading...'
  try {
    const response = await fetch(url);
    if (!response.ok) {
      forecast.style.color = 'red'
      forecast.textContent = `An error occured during fetch ${response.error}`;
      return console.log(`An error occured during fetch ${response.error}`)
    }
    const data = await response.json();
    if (data.error) {
      forecast.style.color = 'red'
      forecast.textContent = `ERROR!: ${data.error}`;
      return console.log(`ERROR!: ${data.error}`)
    }
    console.log(`${data.location}: ${data.forecast}`)
    forecast.style.color = 'black'
    forecast.textContent = `${data.location}: ${data.forecast}`;
    return `${data.location}: ${data.forecast}`
  } catch {
    console.log(`An error occured, try another time`)
  }
}
