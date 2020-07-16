var app = new Vue({
  el: "#app",
  data: {
    appName:'Todo List',
    newtask: '',
    todos: [],
    error: false,
    errorMessage:'Enter Some Task'
  },
  created() {
    this.refreshTodos();
  },

  methods: {
    async refreshTodos() {
      try {
        let response = await axios.get("todos");
        this.todos = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async addTask() {
      try {
        if (this.newtask === "") return (this.error = true);

        this.error = false;

        let response = await axios.post("todos", {
          task: this.newtask,
          done: false
        });
        this.refreshTodos();
      } catch (error) {
        console.log(error);
      }
    },

    async clearTasks() {
      try {
        await axios.delete("todos");
        this.refreshTodos();
      } catch (error) {
        console.log(error);
      }
    },

    async toggleDone(event) {
      try {
        let id = event.target.id;

        await axios.put("todos/" + id, {
          done: event.target.checked
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
});
