const express = require('express')
const swaggerUI = require('swagger-ui-express')
const cors = require('cors')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./docs/swagger.yaml')
const dotenv = require('dotenv');

const port = process.env.PORT || 4002
const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
// routes
app.use('./v1/', v1WorkOutRouter)

app.get('/', (_req, res) => {
	res.redirect('/docs')
})
app.use((req, res) => {
	res.status(404).send({error: 'Not found'})
})
// server listening
app.listen(port, () => { console.log(`🚀Servidor en la url http://127.0.0.1:${port}`)
}   )