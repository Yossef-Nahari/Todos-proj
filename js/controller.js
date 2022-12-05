
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? "done" : ""}"
         onclick="onToggleTodo('${todo.id}')">
         ${todo.txt}
        <button class="removeBtn" onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
    </li>` )

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
    document.querySelector('.done-todos').innerText = getDoneTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    if (!elTxt.value) return
    const txt = elTxt.value
    const elImportance = document.querySelector('.importance')
    const importance = elImportance.value
    addTodo(txt, importance)
    elTxt.value = ''
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    const msg = confirm('Are you sure to delete this todo?')
    if (!msg) return
    else alert('Ok, we will delete it for you!')
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(element, filterBy) {
    if (gFilterBy === filterBy) return
    gFilterBy = filterBy
    const elFilters = document.querySelectorAll('.filters')
    for (var i = 0; i < 3; i++) {
        elFilters[i].classList.remove('clicked')
    }
    element.classList.add('clicked')
    setFilter(filterBy)
    renderTodos()
}

function onSetSort(element, sortBy) {
    if (gSortBy === sortBy) return
    gSortBy = sortBy
    const elSorters = document.querySelectorAll('.sorters')
    for (var i = 0; i < 3; i++) {
        elSorters[i].classList.remove('clicked')
    }
    element.classList.add('clicked')
    setSort(sortBy)
    renderTodos()
}

// function sortBy(todos, gSortBy) {
//     if (gSortBy === 'txt' || gSortBy === 'importance') {
//         return todos.sort((a, b) => a[gSortBy] - b[gSortBy])
//     } else return todos.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
// }