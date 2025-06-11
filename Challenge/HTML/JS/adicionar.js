document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const notification = document.getElementById("notification");

    // Função para criar e adicionar uma tarefa à lista
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            // Criação da tarefa
            const taskItem = document.createElement("li");
            taskItem.classList.add("bg-white", "border", "border-gray-300", "p-4", "rounded-lg", "shadow-sm", "flex", "justify-between", "items-center", "space-x-4");
            
            // Texto da tarefa
            const taskContent = document.createElement("span");
            taskContent.textContent = taskText;
            taskContent.classList.add("task-text");  // Adiciona a classe para manipulação de estilo
            taskItem.appendChild(taskContent);

            // Botão de Concluir
            const completeButton = document.createElement("button");
            completeButton.textContent = "Concluir";
            completeButton.classList.add("bg-green-500", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-green-600", "focus:outline-none", "focus:ring-2", "focus:ring-green-400");
            completeButton.addEventListener("click", function() {
                taskContent.classList.toggle("line-through");  // Adiciona ou remove o risco da tarefa
                completeButton.classList.add("hidden");  // Esconde o botão de concluir
                deleteButton.classList.remove("hidden");  // Exibe o botão de excluir
                showNotification();
            });
            taskItem.appendChild(completeButton);

            // Botão de Excluir
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.classList.add("bg-red-500", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-red-600", "focus:outline-none", "focus:ring-2", "focus:ring-red-400", "hidden");  // Inicialmente escondido
            deleteButton.addEventListener("click", function() {
                taskItem.remove();  // Remove a tarefa da lista
            });
            taskItem.appendChild(deleteButton);

            // Adiciona a tarefa na lista
            taskList.appendChild(taskItem);
            taskInput.value = ""; // Limpa o campo de input
        }
    }

    // Exibe a notificação de tarefa concluída
    function showNotification() {
        notification.classList.remove("hidden");
        setTimeout(function() {
            notification.classList.add("hidden");
        }, 3000); // A notificação desaparece após 3 segundos
    }

    // Adiciona a tarefa ao clicar no botão
    addTaskButton.addEventListener("click", addTask);

    // Adiciona a tarefa pressionando "Enter"
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
