const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const notesPath = path.join(__dirname, 'db.json')

async function addNote(title, body) {
	const notes = await getNotes()
	const note = {
		title,
		body,
		id: (Math.random() * 10000).toFixed(),
	}
	notes.push(note)
	await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, 'utf-8')
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function removeNoteById(remove_id) {
	const notes = await getNotes()
	const updatedNotes = notes.filter((note) => {
		return note.id !== String(remove_id)
	})
	await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
	return updatedNotes
}

async function printNotes() {
	const notes = await getNotes()
	return notes.forEach(({ id, title, body }) => {
		chalk.bgGreen(console.log(`Note id: ${id}, title: ${title}, body: ${body}`))
	})
}

module.exports = { addNote, printNotes, removeNoteById }
