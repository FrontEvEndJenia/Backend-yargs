const yargs = require('yargs')
const { addNote, printNotes, removeNoteById } = require('./notes-controller')

yargs.command({
	command: 'add',
	describe: 'Add new note to list',
	builder: {
		title: {
			type: 'string',
			describe: 'note title',
			demandOption: true,
		},
		body: {
			type: 'string',
			describe: 'note body',
			demandOption: true,
		},
	},
	handler({ title, body }) {
		console.log('Add new note to list')
		addNote(title, body)
	},
})

yargs.command({
	command: 'list',
	describe: 'Print all notes',
	async handler() {
		console.log('Print all notes')
		await printNotes()
	},
})

yargs.command({
	command: 'remove',
	describe: 'Remove note by id',
	async handler({ id }) {
		console.log('Remove note by id')
		await removeNoteById(id)
		await printNotes()
	},
})

yargs.parse()
