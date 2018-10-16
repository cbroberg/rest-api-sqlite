const Sequelize = require('sequelize')
const epilogue = require('epilogue')

// Database
const database = new Sequelize({
	dialect: 'sqlite',
	storage: './restapi.sqlite',
	operatorsAliases: false,
	logging: false
})

// Model
const Part = database.define('parts', {
	partNumber: Sequelize.STRING,
	modelNumber: Sequelize.STRING,
	name: Sequelize.STRING,
	description: Sequelize.TEXT
})

// Initialize + endpoints
const initializeDatabase = async (app) => {
	epilogue.initialize({ app, sequelize: database })

	epilogue.resource({
		model: Part,
		endpoints: ['/parts', '/parts/:id']
	})

	await database.sync()

	// Log all parts	
	// Part.findAll().then(parts => {
	// 	console.log(parts)
	// })

	part = await Part.findOne()
	console.log(part.get('name'));
}

module.exports = initializeDatabase
