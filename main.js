// HTML переменные
const time = document.querySelector('h1')
const date = document.querySelector('h2')
const timezone = document.querySelector('p')
const timezone_selector = document.querySelector('#timezone_selector')

// Объект настроек получения даты
const timezone_options = {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeZoneName: 'short' 
}

// Получение всех часовых поясов
const timezones = Intl.supportedValuesOf('timeZone')
for (const tz of timezones) {
    const option = document.createElement('option')
    option.value = tz
    option.innerHTML = tz.split("/").map(part => part.replace('_', ' ')).join(' - ')

    timezone_selector.appendChild(option)
}
timezone_selector.value = timezone_options.timeZone

// Обработчик выбора часового пояса
timezone_selector.addEventListener('input', (event) => {
    const selected_timezone = event.target.value
    timezone_options.timeZone = selected_timezone
})

function setTime() {
    const now = new Date()
    const now_object = now.toLocaleString({}, timezone_options).split(' ')

    date.innerHTML = now_object[0].slice(0, -1)
    time.innerHTML = now_object[1]
    timezone.innerHTML = now_object[2]
}

const interval = setInterval(setTime, 1000)
setTime()

document.addEventListener('beforeunload', () => {
    clearInterval(interval)
})