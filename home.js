
let data_arr = get_todo_array_from_local_storage();
let category_arr=get_categories_from_local_storage()==null ? ["All"]:get_categories_from_local_storage();
var list_view = document.getElementById("list_view");
function add_item() {
    let subtask_dropdown=document.getElementById("add_as_subtask_to").value;
 console.log(subtask_dropdown);
    const obj_item = { "task": "", "id": 0 ,"check_as_done_undone":false,"duedate":"","priority":"Low","categories":"All","Tags":[],"subtask":[]};
    obj_item.task = document.getElementById("enter_task").value;
    obj_item.id = data_arr.length;
    obj_item.duedate=document.getElementById("due_date").value;
    obj_item.priority=document.getElementById("priority").value;
    obj_item.categories=document.getElementById("category_dynamic_item_add").value;
    add_tags_to_data_arr(obj_item);

    if(obj_item.task!="" && obj_item.duedate!="" && subtask_dropdown==-1){
    data_arr.unshift(obj_item);
    show_elements(data_arr);
    document.getElementById("enter_task").value = "";
    show_activelogs("Added New Main task.");
}
else{
    
    obj_item.id=100000*data_arr[subtask_dropdown].id+data_arr[subtask_dropdown].subtask.length+1;
    obj_item.categories=data_arr[subtask_dropdown].categories;
    data_arr[subtask_dropdown].subtask.unshift(obj_item);
    show_elements(data_arr);
    document.getElementById("enter_task").value = "";
    show_activelogs("Added New Child task.");
}
}
function show_elements(data_arr) {
    list_view.innerHTML = "";
    for (let i = 0; i < data_arr.length; i++) {
        if(data_arr[i].check_as_done_undone)
        list_view.innerHTML
+='<div style="display: flex; flex-direction: column; border: solid;border-radius: 20px; width: 90%;"><div class="show_List_todo"><input type="checkbox" checked class="mark_as_done" id="check_box_checked_"'+i+' onclick="mark_as_done_undone('+i+')"><h2 class="show_data" id="visual_data_here_' + i + '"><s>' + data_arr[i].task + '</s></h2> <button type="submit" name="Edit" class="edit_button_style" id="edit_item_btn_' + i + '" onclick="edit_item(' + i + ')">Edit</button> <button type="submit" name="delete"class="delete_button_style" id="" onclick="delete_item(' + i + ')">Delete</button></div><div style="display: flex; flex-direction: row;"><div class="priority"><h4>Priority: '+data_arr[i].priority+'<br>Due Date:'+data_arr[i].duedate+' </h4></div><div class="priority"><h4>Category: '+data_arr[i].categories+'<br><div class="tags_style" id="tags_add_here_'+i+'">Tags:</div></h4></div></div><div class="subtask" id="subtask_list_'+i+'"><h4>SubTask:</h4></div></div>'
    else{
        list_view.innerHTML
        += '<div style="display: flex; flex-direction: column; border: solid;border-radius: 20px; width: 90%;"><div class="show_List_todo"><input type="checkbox" class="mark_as_done" id="check_box_checked_"'+i+' onclick="mark_as_done_undone('+i+')"><h2 class="show_data" id="visual_data_here_' + i + '">' + data_arr[i].task + '</h2> <button type="submit" name="Edit" class="edit_button_style" id="edit_item_btn_' + i + '" onclick="edit_item(' + i + ')">Edit</button> <button type="submit" name="delete"class="delete_button_style" id="" onclick="delete_item(' + i + ')">Delete</button></div><div style="display: flex; flex-direction: row;"><div class="priority"><h4>Priority: '+data_arr[i].priority+'<br>Due Date:'+data_arr[i].duedate+' </h4></div><div class="priority"><h4>Category: '+data_arr[i].categories+'<br><div class="tags_style" id="tags_add_here_'+i+'">Tags:</div></h4></div></div><div class="subtask" id="subtask_list_'+i+'"><h4>SubTask:</h4></div></div>'

    }
    visualize_tags(data_arr[i],i);
    if(data_arr[i].subtask.length>0)
    show_sub_task_elements(data_arr[i].subtask,i);
}
    store_todo_array_in_local_storage(data_arr);
    category_list_show_left();
    category_dropdown_list();
    subtask_dropdown_list();
    date_update_as_text_input();
    show_backlogs();
}


function delete_item(id) {
    show_activelogs("Deleted main task named:"+data_arr[id].task);

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
    show_activelogs("Edited main task named:"+data_arr[id].task);

}
function date_update_as_text_input(){
    let input_text_box=document.getElementById("enter_task");
    input_text_box.onkeyup= function(){
        if(input_text_box.value.includes("tomorrow")){
        let duedate_update=document.getElementById("due_date");
    const tomorrowsDate = get_Tomorrows_Date();
    const format_date=tomorrowsDate.toISOString().slice(0,10);
    duedate_update.value=format_date;
    var inputstring=input_text_box.value;
       var inputstring= inputstring.replace('tomorrow','');
    input_text_box.value=inputstring;
    show_activelogs("Took tommorow keyword as date.");

}
    }
}
function get_Tomorrows_Date() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  }
function mark_as_done_undone(id){
   let item_to_edit = document.getElementById("visual_data_here_" + id);
   if(!data_arr[id].check_as_done_undone){
    let strike_off_task='<s>';
    strike_off_task+=item_to_edit.innerHTML;
    strike_off_task+='</s>';    
    item_to_edit.innerHTML=strike_off_task
    data_arr[id].check_as_done_undone=true;
    show_activelogs("Subtask Named:"+data_arr[id].task+" Unmarked");
 
}else{
    item_to_edit.innerHTML=data_arr[id].task;
    data_arr[id].check_as_done_undone=false;
    show_activelogs("Subtask Named:"+data_arr[id].task+" marked");
 
}
store_todo_array_in_local_storage(data_arr);
}
function store_todo_array_in_local_storage(data_arr){
    localStorage.removeItem('data_arr_unique');
    localStorage.setItem('data_arr_unique',JSON.stringify(data_arr));
    console.log(data_arr);
}
function get_todo_array_from_local_storage(){
   const arr=localStorage.getItem('data_arr_unique');
    if(arr==null || arr=='undefined'){
        return [];
    }
    return JSON.parse(arr);
}

//------------------------------------Categories------------------------------------------

function get_categories_from_local_storage(){
    return JSON.parse(localStorage.getItem('categories_unique'));
}
function set_categories_in_local_storage(category){
    localStorage.removeItem('categories_unique');
    localStorage.setItem('categories_unique',JSON.stringify(category));
} 
function category_list_show_left(){
    let category_list=document.getElementById("category_list");
    category_list.innerHTML='';
    for(i=0;i<category_arr.length;i++){
        category_list.innerHTML+='<button class="category_list" id="category_button_'+i+'" onclick="filter_by_category('+i+')">'+category_arr[i]+'</button>';
    }
}

function clearstorage(){
    localStorage.clear();
    console.log('storage cleared');
}

function category_dropdown_list(){
    let category_dropdown=document.getElementById("category_dynamic_item_add");
    category_dropdown.innerHTML='';
    for(i=0;i<category_arr.length;i++){
        category_dropdown.innerHTML+='<option value="'+category_arr[i]+'">'+category_arr[i]+'</option>'
    }  
}

function Create_new_category(){
    let cat_entry=document.getElementById("create_category");
    if(cat_entry.value!=""){
    console.log(cat_entry.value);
    category_arr.push(cat_entry.value);
    set_categories_in_local_storage(category_arr);
    show_elements(data_arr);
    show_activelogs("New Category created named:"+cat_entry.value);

}
}

function filter_by_category(id){
    let cat_value_for_filter=document.getElementById("category_button_"+id);
    let cat_arr=[];
    data_arr.forEach((elem)=>{
        if(elem.categories==cat_value_for_filter.innerText)
        cat_arr.push(elem);
    });
    if(cat_value_for_filter.innerText=="All")
    show_elements(data_arr);
    else
    show_elements(cat_arr);
    show_activelogs("Category Filter Applied for "+cat_value_for_filter.innerText);

}


//-------------------------------------------Tags------------------------------

function add_tags_to_data_arr(obj_item){
    let tag_entry=document.getElementById("enter_tags");
    let string_Array = tag_entry.value.split(" ");
    obj_item.Tags=string_Array;
    tag_entry.value='';
}

function visualize_tags(obj_item , id){
    console.log(obj_item);
    let tag_show_elem=document.getElementById("tags_add_here_"+id);
    if(obj_item.Tags.length!=0){
        obj_item.Tags.forEach((elem)=>{
            tag_show_elem.innerHTML+=elem+" ";
        });
    }
}



//------------------------------------Filter by Priority-------------------

function filter_by_priority(){
    let priority_value_for_filter=document.getElementById("priority_left");
    let prio_arr=[];
    data_arr.forEach((elem)=>{
        if(elem.priority==priority_value_for_filter.value)
        prio_arr.push(elem);
    });
    if(priority_value_for_filter.value=="all")
    show_elements(data_arr);
    else
    show_elements(prio_arr);
    show_activelogs("Filter by priority:"+priority_value_for_filter.value);

}
function sort_by_priority(){
    
    const sorted_by_pro = data_arr.sort((a, b) => {
        const priorityOrder = { low: 1, medium: 2, high: 3 }; 
        // Define priority order
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      show_elements(sorted_by_pro); 
      show_activelogs("Sort by priority LOW to HIGH");
 
}

//-------------------------------------filter by duedate-----------------------------
function filter_by_due_date(){
    let start_date=document.getElementById("due_date_start").value;
    let end_date=document.getElementById("due_date_end").value;
    if(start_date!="" && end_date!=""){
    let starting_date=Date.parse(start_date);
    let ending_date=Date.parse(end_date);
    let date_arr=[];
    data_arr.forEach((elem)=>{
        let check_date=Date.parse(elem.duedate);
        if((check_date<= ending_date && check_date >= starting_date)) 
        date_arr.push(elem);
    });
    show_elements(date_arr);
    show_activelogs("Filtered By Due date:");

}
}

function sort_by_due_date(){
    
    const sorted_by_due_date = data_arr.sort((a, b) => {
        // Define priority order
        return new Date(b.duedate) - new Date(a.duedate);
      });
      show_elements(sorted_by_due_date);  
      show_activelogs("Sorted by Due Date");

    }

//----------------------------------------subtask---------------------------------------
function subtask_dropdown_list(){
    let subtask_dropdown=document.getElementById("add_as_subtask_to");
    subtask_dropdown.innerHTML='<option value="-1">None</option>';
    for(i=0;i<data_arr.length;i++){
        subtask_dropdown.innerHTML+='<option value="'+i+'">'+data_arr[i].task+'</option>'
    }  
}
function show_sub_task_elements(arr,id){
    let list_view_for_subtask=document.getElementById("subtask_list_"+id);
  console.log("arr chck"+arr);
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].check_as_done_undone)
        list_view_for_subtask.innerHTML
+='<div draggable="true" class="main_cont_for_drag" style="display: flex; flex-direction: column; border: solid;border-radius: 20px; width: 90%;" ><div class="show_List_todo"><input type="checkbox" checked class="mark_as_done" id="check_box_checked_"'+i+' onclick="mark_as_done_undone_subtask('+id+","+i+')"><h2 class="show_data" id="visual_data_here_'+id+'_sub'+i+'"><s>'+arr[i].task + '</s></h2> <button type="submit" name="Edit" class="edit_button_style" id="edit_item_btn_'+id+'_sub_'+i+'" onclick="edit_item_subtask(' +id+","+ i + ')">Edit</button> <button type="submit" name="delete"class="delete_button_style" id="" onclick="sub_task_delete('+id+"," + i + ')">Delete</button></div><div style="display: flex; flex-direction: row;"><div class="priority"><h4>Priority: '+arr[i].priority+'<br>Due Date:'+arr[i].duedate+' </h4></div><div class="priority"><h4>Category: '+arr[i].categories+'<br><div class="tags_style" id="tags_add_here_'+id+'_sub_'+i+'">Tags:</div></h4></div></div></div>'
    else{
        list_view_for_subtask.innerHTML
+= '<div draggable="true" class="main_cont_for_drag" style="display: flex; flex-direction: column; border: solid;border-radius: 20px; width: 90%;"><div class="show_List_todo"><input type="checkbox" class="mark_as_done" id="check_box_checked_"'+i+' onclick="mark_as_done_undone_subtask('+id+","+i+')"><h2 class="show_data" id="visual_data_here_'+id+'_sub'+i+'">' + arr[i].task + '</h2> <button type="submit" name="Edit" class="edit_button_style" id="edit_item_btn_'+id+'_sub_'+i+'" onclick="edit_item_subtask('+id+"," + i + ')">Edit</button> <button type="submit" name="delete"class="delete_button_style" id="" onclick="sub_task_delete('+id+"," + i + ')">Delete</button></div><div style="display: flex; flex-direction: row;"><div class="priority"><h4>Priority: '+arr[i].priority+'<br>Due Date:'+arr[i].duedate+' </h4></div><div class="priority"><h4>Category: '+arr[i].categories+'<br><div class="tags_style" id="tags_add_here_'+id+'_sub_'+i+'">Tags:</div></h4></div></div></div>'
    }
    visualize_tags_subtask(arr[i],i,id);
 // show_sub_task_elements(data_arr[i].subtask,i);
 var cols = document.querySelectorAll('#subtask_list_'+id+' .main_cont_for_drag');
 [].forEach.call(cols, addDnDHandlers);
}
}
function sub_task_delete(parent_id,child_id){
    
    show_activelogs("Subtask deleted Named:"+data_arr[parent_id].subtask[child_id].task);
    data_arr[parent_id].subtask.splice(child_id, 1);
    show_elements(data_arr);

}


function edit_item_subtask(parent_id,child_id) {
    let item_to_edit = document.getElementById("visual_data_here_"+parent_id+"_sub" + child_id);
    let button_to_update = document.getElementById("edit_item_btn_"+parent_id+'_sub_'+child_id);
    let inner_text = item_to_edit.innerText;
    item_to_edit.outerHTML = '<input type="text" class="text_box" id="update_task_sub" value="' + inner_text + '">';
    button_to_update.outerHTML = '<button type="submit" name="Edit" class="save_button_style" id="edit_item_btn_sub' + child_id + '" onclick="update_item_subtask('+parent_id+","+ child_id+ ')">Update</button>';
    console.log("edit id :"+parent_id+" "+chi)
}
function update_item_subtask(parent_id,child_id) {
    let update_item = document.getElementById("update_task_sub");
    data_arr[parent_id].subtask[child_id].task = update_item.value;
    show_elements(data_arr);
    show_activelogs("Updated Subtask Named:"+data_arr[parent_id].subtask[child_id].task);
   
}
function mark_as_done_undone_subtask(parent_id,child_id){
    let item_to_edit = document.getElementById("visual_data_here_"+parent_id+"_sub" + child_id);
    if(!data_arr[parent_id].subtask[child_id].check_as_done_undone){
     let strike_off_task='<s>';
     strike_off_task+=item_to_edit.innerHTML;
     strike_off_task+='</s>';    
     item_to_edit.innerHTML=strike_off_task
     data_arr[parent_id].subtask[child_id].check_as_done_undone=true;
     show_activelogs("Subtask Named:"+data_arr[parent_id].subtask[child_id].task+" marked");
 
    }else{
     item_to_edit.innerHTML=data_arr[parent_id].subtask[child_id].task;
     data_arr[parent_id].subtask[child_id].check_as_done_undone=false;
     show_activelogs("Subtask Named:"+data_arr[parent_id].subtask[child_id].task+" unmarked");
 
    }
 store_todo_array_in_local_storage(data_arr);
      
}
function visualize_tags_subtask(obj_item , child_id,parent_id){
    let tag_show_sub=document.getElementById("tags_add_here_"+parent_id+"_sub_"+child_id);
    if(obj_item.Tags.length!=0){
        obj_item.Tags.forEach((elem)=>{
            tag_show_sub.innerHTML+=elem+" ";
        });
    }
}


//-----------------------------------------------------------activelogs---------------------------
function show_activelogs(task_update){
    let elem=document.getElementById("active_logs");
    elem.innerHTML+='<li>'+task_update+'</li>';
}
//----------------------------------------------------------backlogs-------------------------------
function show_backlogs(){
    let missed_task=document.getElementById("back_logs_missed");
    let pending_task=document.getElementById("back_logs_pending");
    pending_task.innerHTML='';
    missed_task.innerHTML='';
    let today = new Date();
    const format_date=today.toISOString().slice(0,10);
   data_arr.forEach((elem)=>{
        const duedate=elem.duedate;
        console.log(duedate.valueOf()+" " +format_date.valueOf());
        if(duedate.valueOf()>=format_date.valueOf()){
            pending_task.innerHTML+='<li>'+elem.task+'</li>';
        }else{
            missed_task.innerHTML+='<li>'+elem.task+'</li>';
        }
    if(elem.subtask.length>0){
        elem.subtask.forEach((e)=>{
            const duedatesub=e.duedate;
            if(duedatesub.valueOf()>=format_date.valueOf()){
                pending_task.innerHTML+='<li>'+e.task+'</li>';
            }else{
                missed_task.innerHTML+='<li>'+e.task+'</li>';
            }
        });
    }
    });
}

//-----------------------------------------------search------------------------------
function search_through_task(){
    let search_text=document.getElementById("search").value;
    let arr=[];
    for(i=0;i<data_arr.length;i++){
        let include_in_tag_or_name=false;
        data_arr[i].Tags.forEach((el)=>{
            if(el.includes(search_text))
            include_in_tag_or_name=true;
        });
        if(data_arr[i].task.includes(search_text) || include_in_tag_or_name){
            arr.unshift(data_arr[i]);
        }    
    if(data_arr[i].subtask.length>0){   
        sub_arr=data_arr[i].subtask;
            for(j=0;j<sub_arr.length;j++){
                let include_in_tag_or_name_sub=false;
                sub_arr[j].Tags.forEach((el)=>{
                    if(el.includes(search_text))
                        include_in_tag_or_name_sub=true;    
                });
             
                if(sub_arr[j].task.includes(search_text) || include_in_tag_or_name_sub){
                    arr.unshift(sub_arr[j]);
                }
                
        }
    }
}

    if(search_text==""){
        show_elements(data_arr);
    }else{
        show_elements(arr);
    }
}


//------------------------------------------------Drag and drop--------------------
var dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);
  this.classList.add('dragElem');
}
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); 
  }
  this.classList.add('over');

  e.dataTransfer.dropEffect = 'move'; 
  return false;
}

function handleDragLeave(e) {
  this.classList.remove('over');
}
function handleDragEnter(e) {
    }
function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (dragSrcEl != this) {
    this.parentNode.removeChild(dragSrcEl);
    var dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin',dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
  }
  this.classList.remove('over');
  return false;
}

function handleDragEnd(e) {
  this.classList.remove('over');
}

function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragenter', handleDragEnter, false)
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);
}

