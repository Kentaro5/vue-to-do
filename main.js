// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
//Storage APIを使用。
var todoStorage = {
    fetch: function () {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function (todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}


const app = new Vue({
    el: '#app',
    data: {
        //どんなデータを使用するか初期値で宣言
        todos: []
    },
    methods: {
        // 使用するメソッド
    },
    filters: {
        // 使用するメソッド
    },
    computed: {
        // 使用するメソッド
    },
})