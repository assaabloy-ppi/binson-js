var binsonTests = require('./binsontests.js')
var binsonParserTests = require('./binsonparsertests.js')

run()

function run() {
	console.log('\n============ RUNNING BINSON TEST SUITE ============')

	binsonTests.run()
	binsonParserTests.run()

	console.log('============= BINSON TEST SUITE ENDED =============\n')
}
