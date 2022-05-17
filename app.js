const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT ?? 3001

var title = ''
var date = ''
var description = ''
var text = ''
var resultText = ''

app.route('/')
  .get(function(req, res) { 
    axios.get('https://ria.ru/20211115/sostoyanie-1759039765.html')
      .then(response => {
        // Поиск Title
        title = response.data.match(/<div class=\"article_+title\">(.*?)<\/div>/gi)

        // Поиск Date
        date = response.data.match(/<div class=\"article__info-date\">\s*<a[^>]*>(.*?)<\/a>/gi)

        // Поиск Description
        description = response.data.match(/<h1 class=\"article__second-title\">(.*?)<\/h1>/gi)

        // Поиск Text
        text = response.data.match(/<div class=\"article__block[^>]*>(.*?)<\/div>/gi)
        for (let i = 0; i < text.length; i++) {
          resultText += text[i]
        }

        // Выводим результат
        res.send(title[0] + '\n' + date[0] + '\n' + description[0] + '\n' + resultText)
      })
      .catch(error => {
        console.log(error)
      })
  })

// Установка порта и вывод в консоль
app.listen(PORT, () => {
  console.log(`Server run on ${PORT}...`)
})