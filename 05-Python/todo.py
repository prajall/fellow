todos = [];

while True:
    option = input("""
    Choose What you want to do:
    1. Add new Task,
    2. View All tasks
    3. Mark Task as Done,
    4. Delete Task 
    5. Exit        
    """)

    match int(option):
        case 1:
            new_task = input("Enter task name:");
            todos.append(new_task)
        
        case 2:
            print("Your Todos:")
            for index, task in enumerate(todos):
                print(index+1,".",todos[index])
        case 3:
            print("Your Todos:")
            for index, task in enumerate(todos):
                print(index + 1,".",todos[index])
            task_index = int(input("Which task you want to mark done? "))
            if task_index > len(todos) + 1:
                print("Out of range")
                continue 
            task_done = f"(Done) {todos[task_index-1]}"
            todos[task_index] = task_done
        case 5:
            print("Bye Bye")
            break
        case _:
            print("Bye Bye")
            break