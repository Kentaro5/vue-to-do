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
        doAdd: function (event, value) {
            // refで名前をつけておいた要素を参照
            var comment = this.$refs.comment
            //入力がなければ何もしないで return
            if (!comment.value.trim().length) {
                //フォーム要素を空にする。
                comment.value = ''
                return
            }

            //{新しいID, コメント, 作業状態}
            //というオブジェクトを現在のtodosリストへpush
            //作業状態「state」はデフォルト「作業中＝0」で作成
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            //フォーム要素を空にする。
            comment.value = ''
        }
    },
    watch: {
        //オプションを使う場合は、オブジェクト形式にする
        todos: {
            //引数はウォッチしているプロパティの変更後の値
            handler: function (todos) {
                todoStorage.save(todos)
            },
            //deepオプションでネストしているデータも監視できる。
            deep: true
        }
    }
})