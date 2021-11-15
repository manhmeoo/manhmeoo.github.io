<template>
  <div id="app">
    <input type="text" v-model="newTask" />
    <button @click="addTask()">add</button>
    <div v-for="(task, index) in tasks" :key="index">
      <span :class="{ done: task.done }">{{ task.todo }}</span>
      <input type="checkbox" v-model="task.done" />
      <button @click="delTask(index)">del</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
      tasks: [
        { todo: "an", done: false },
        { todo: "ngu", done: false },
        { todo: "ia", done: false },
        { todo: "lam", done: false },
        { todo: "repeat", done: true },
        { todo: "eat", done: false },
      ],
    };
  },
  methods: {
    addTask: function () {
      if (this.newTask.length > 0) {
        this.tasks.push({ todo: this.newTask, done: false });
      }
      alert("khong dc de trong");
      this.newTask = "";
    },

    delTask: function (index) {
      this.tasks.splice(index, 1);
    },
  },
  watch: {
    newTask: function (newValue, oldValue) {
      console.log(oldValue);
      console.log(newValue);
    },
  },
};
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
