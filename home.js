
let data_arr = [];
var list_view = document.getElementById("list_view");
function add_item() {
    const obj_item = { "task": "", "id": 0 };
    obj_item.task = document.getElementById("enter_task").value;
    obj_item.id = data_arr.length;
    data_arr.unshift(obj_item);
    show_elements();
    document.getElementById("enter_task").value = "";
}
function show_elements() {
    list_view.innerHTML = "";
    for (let i = 0; i < data_arr.length; i++) {
        list_view.innerHTML
            += '<div class="show_List_todo"><h2 class="show_data" id="visual_data_here_' + i + '">' + data_arr[i].task + '</h2> <button type="submit" name="Edit" class="edit_button_style" id="edit_item_btn_' + i + '" onclick="edit_item(' + i + ')">Edit</button> <button type="submit" name="delete" class="delete_button_style" id="" onclick="delete_item(' + i + ')">Delete</button></div>';
    }
}
function delete_item(id) {
    data_arr.splice(id, 1);
    show_elements(data_arr);
}

function edit_item(id) {
    let item_to_edit = document.getElementById("visual_data_here_" + id);
    let button_to_update = document.getElementById("edit_item_btn_" + id);
    let inner_text = item_to_edit.innerText;
    item_to_edit.outerHTML = '<input type="text" class="text_box" id="update_task" value="' + inner_text + '">';
    button_to_update.outerHTML = '<button type="submit" name="Edit" class="save_button_style" id="edit_item_btn_' + id + '" onclick="update_item(' + id + ')">Update</button>';
}
function update_item(id) {
    let update_item = document.getElementById("update_task");
    data_arr[id].task = update_item.value;
    show_elements(data_arr);
}

async function fetch_data() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todo_item_fetched = await response.json();
    if (response.status == 200) {
        todo_item_fetched.forEach(obj => {
            var object_item = { task: "", id: 0 };
            object_item.id = obj.id - 1;
            object_item.task = obj.title;
            data_arr.push(object_item);
        });
    }
    show_elements();

}
window.onload = function () {
    fetch_data();
};