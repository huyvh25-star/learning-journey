const tasks = [];
let btnAdd = document.querySelector(".btn-add");
let listHtml = document.querySelector(".list-tasks");
let task = {
    name: '',
    status: false
};
// tạo sự kiến lắng nghe cho input 
document.querySelector("#input-text").addEventListener('input', function () {
    task.name = this.value;
})

// sự kiện add task vào list
btnAdd.addEventListener('click', function () {
    tasks.push({ name: task.name, status: false })
    console.log("tasks : ", tasks);
    renderHtmlList(tasks)
})

const renderHtmlList = (tasks) => {
    listHtml.innerText = '';
    tasks.map((item, index) => {
        renderHtmlItem(item.name, index);
    })
}
const renderHtmlItem = (content, index) => {
    console.log('content : ', content, ' index : ', index);
    // tạo li 
    let li = document.createElement("li");
    // tạo thẻ a và btn - delete 
    let a = document.createElement("a");
    let btn = document.createElement("button");
    let input = document.createElement("input");
    input.type = 'checkbox';

    a.innerText = content;
    btn.innerText = 'xóa';

    btn.addEventListener('click', function () {
        console.log('xóa vị trí : ', index);
    })
    input.addEventListener('change', function () {
        console.log('checked vị  trí : ', index);
    })
    li.appendChild(a)
    li.appendChild(input);
    li.appendChild(btn)

    listHtml.appendChild(li);
}