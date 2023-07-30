// HTML переменные
const time = document.querySelector('h1')
const date = document.querySelector('h2')
const timezone = document.querySelector('p')
const timezone_selector = document.querySelector('#timezone_selector')

// Объект настроек получения даты
const timezone_options = { 
    timeZoneName: 'short' 
}

// Получение всех часовых поясов
const timezones = Intl.supportedValuesOf('timeZone')
timezones.forEach(tz => {
    const option = document.createElement('option')
    option.value = tz
    option.innerHTML = tz.split("/").map(part => part.replace('_', ' ')).join(' - ')

    timezone_selector.appendChild(option)
})

// Обработчик выбора часового пояса
timezone_selector.addEventListener('input', (event) => {
    const selected_timezone = event.target.value
    timezone_options.timeZone = selected_timezone
})

const interval = setInterval(() => {
    const now = new Date()

    const now_time = now
        .toLocaleTimeString({}, timezone_options)
        .split(' ')

    time.innerHTML = now_time[0]
    date.innerHTML = now.toLocaleDateString({}, timezone_options).slice(0, 10)
    timezone.innerHTML = now_time[1]
}, 1000)

document.addEventListener('beforeunload', () => {
    clearInterval(interval)
})