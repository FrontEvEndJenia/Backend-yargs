const yargs = require('yargs')
const { addNote, printNotes, removeNoteById, updateNote } = require('./notes-controller')

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

yargs.command({
	command: 'update',
	describe: 'Update note by id & new title',
	async handler({ id, title }) {
		console.log('Update note')
		await updateNote(id, title)
		await printNotes()
	},
})

yargs.parse()
