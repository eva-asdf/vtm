
// ----------------------------------------------------------------------------------------

let liClass = document.querySelectorAll('#kind .nav li:nth-of-type(n+2)'),
    pageWrap = document.querySelector('.page_wrap');//页数按钮
//初始化内容界面
var main = document.querySelector('#kind .content');//书本

//判断展示的类
let index = getcookie('classId');
if (!index) {
show(main,0,0,pageWrap,'http://vtmer.cn/class');
} else{
    show(main,index,0,pageWrap,'http://vtmer.cn/class');
    showActive(liClass,liClass[index]);
}


function showActive(arr,target) {
    arr.forEach(value=> {
        value.classList.remove('active');
    })
    target.classList.add('active');
}




//大类显示
liClass.forEach((value,index) => {
    value.onclick = function() {
        showActive(liClass,value);
        show(main,index,0,pageWrap,'http://vtmer.cn/class');
    }
    
})



/*******************搜索跳转***************************/
let searchBtn = document.querySelector('#top_nav form > span'),
    searchinput = document.querySelector('#top_nav form > input');
