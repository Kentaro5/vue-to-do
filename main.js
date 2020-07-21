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
        todos: [],
        options: [
            { value: -1, label: 'すべて' },
            { value: 0, label: '作業中' },
            { value: 1, label: '完了' },
        ],
        current: -1
    },
    created() {
        this.todos = todoStorage.fetch();
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
        },
        //　状態変更の処理
        doChangeState: function (item) {
            item.state = item.state ? 0 : 1;
        },
        //削除の処理
        doRemove: function (item) {
            //削除した要素のindexを取得。
            var index = this.todos.indexOf(item)
            //削除した要素をtodosの中から削除。
            this.todos.splice(index, 1)
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
    },
    computed: {
        labels() {
            return this.options.reduce(function (new_object, options_object) {
                return Object.assign(new_object, {
                    [options_object.value]: options_object.label
                })
            }, {})
            // options_object = options
            // new_object = データを加工したもの。
            // キーからみつけやすいように、次のように加工したデータを作成。
            // {0: '作業中', 1: '完了', -1: 'すべて'}
        },
        //thisの値に変化があるたびに、computedTodosが発火する。
        computedTodos: function () {

            //データcurrentが-1ならすべて
            //それ以外ならcurrentとstateが一致(true)するものだけデータを返す
            //第２引数のthisでoptionsやtodos,currentにthis.でアクセスできる。
            return this.todos.filter(function (e) {
                return this.current < 0 ? true : this.current === e.state
            }, this)
        }
    }
})