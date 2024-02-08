const divUl = document.querySelector('ul')
const addBtn = document.querySelector('.btn-add')
const textInput = document.querySelector('.todo-input')
const pEmpty = document.querySelector('.error-info')
const listDeleter = document.querySelectorAll('.delete')
const listComplete = document.querySelectorAll('.complete')
const listEdit = document.querySelectorAll('.edit')
const repeat = document.querySelector('.tools').cloneNode(true)
const pop = document.querySelector('.popup')
const cancelEditBtn = document.querySelector('.cancel')
const inputEdit = document.querySelector('.popup-input')
const acceptEditBtn = document.querySelector('.accept')
let updateTextEdit
let varLi
const popInfo = document.querySelector('.popup-info')

function addTask() {
	if (textInput.value === '') {
		pEmpty.textContent = 'Wpisz treść zadania!'
	} else {
		if (document.querySelector('.tools')) {
			var repeat2 = document.querySelector('.tools').cloneNode(true)
		} else {
			var repeat2 = repeat
		}

		const newText = textInput.value[0].toUpperCase() + textInput.value.substring(1)
		const valueId = divUl.querySelectorAll('li').length + 1
		const newLi = document.createElement('li')
		divUl.appendChild(newLi)
		newLi.setAttribute('data-id', `test${valueId}`)
		newLi.textContent = `${newText}`
		newLi.appendChild(repeat2)

		textInput.value = ''
		const newlistDeleter = document.querySelectorAll('.delete')
		addEventListenerList(newlistDeleter, delTask)
		const newlistComplet = document.querySelectorAll('.complete')
		addEventListenerList(newlistComplet, complTask)
		const newlistEdit = document.querySelectorAll('.edit')
		addEventListenerList(newlistEdit, editTask)
		pEmpty.textContent = ''
	}
}
function testP() {
	if (divUl.querySelectorAll('li').length != 0) {
		pEmpty.textContent = ''
	} else {
		pEmpty.textContent = 'Brak zadań na liście.'
	}
}

function delTask(x) {
	x.target.parentNode.parentElement.remove()
	testP()
}

function complTask(x) {
	x.target.parentNode.parentElement.classList.toggle('completed')

	// console.log(x.target.parentElement.classList.toggle('completed'))
	testP()
}

function editTask(x) {
	pop.style.display = 'flex'
	updateTextEdit = `${x.target.parentElement.parentElement.firstChild.nodeValue.trim()}`
	inputEdit.value = updateTextEdit
	varLi = x.target.parentElement.parentElement
	return varLi
}

function uploadTask() {
	if (inputEdit.value == '') {
		popInfo.textContent = 'Musisz podać jakąś wartość!'
	} else {
		varLi.firstChild.nodeValue = inputEdit.value[0].toUpperCase() + inputEdit.value.substring(1)
		popInfo.textContent = ''
		pop.style.display = 'none'
	}
}

function addEventListenerList(list, fn) {
	for (var i = 0, len = list.length; i < len; i++) {
		list[i].addEventListener('click', fn, false)
	}
}

function cancelEdit() {
	// inputEdit.value = `${x.target.parentNode.parentNode.firstChild.nodeValue.trim()}`

	pop.style.display = 'none'
}

testP()
addEventListenerList(listDeleter, delTask)
addEventListenerList(listComplete, complTask)
addEventListenerList(listEdit, editTask)

addBtn.addEventListener('click', addTask)
acceptEditBtn.addEventListener('click', uploadTask)
cancelEditBtn.addEventListener('click', cancelEdit)
textInput.addEventListener('keypress', function (event) {
	// If the user presses the "Enter" key on the keyboard
	if (event.key === 'Enter') {
		// Cancel the default action, if needed

		// Trigger the button element with a click
		addBtn.click()
		testP()
	}
})
