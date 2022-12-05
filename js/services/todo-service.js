const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'
var gSortBy = 'txt'

_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)
    console.log(gTodos)
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy
}

function getTotalTodos() {
    if (gTodos.length === 0) return 'No todos to display!'
    return gTodos.length
}

function getActiveTodos() {
    const activeTodos = gTodos.filter(todo => !todo.isDone).length
    if (!activeTodos) return 'No active todos!'
    return activeTodos
}

function getDoneTodos() {
    const doneTodos = gTodos.filter(todo => todo.isDone).length
    if (!doneTodos) return 'No done todos!'
    return doneTodos
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt, importance) {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createAt: new Date(),
        importance
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

