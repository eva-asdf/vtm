let personal = document.querySelector('#personal'),
    collet = personal.querySelector('.content'),
    pageWrap = personal.querySelector('.page_wrap'),
    userId = getcookie('userId');

show(collet,0,0,pageWrap,'http://vtmer.cn/collect');

let personMaterrial = document.querySelector('#person_materrial'),
edit = personal.querySelector('.edit');

edit.onclick = function() {
    personal.classList.remove('show');
    personMaterrial.classList.add('show');
}

let submitAvater = document.querySelector('#person_materrial .list li.avater .submit input');
let form = document.querySelector("#person_materrial .list li.avater .submit");



//改用户信息
let userName1 = document.querySelector('#person_materrial .list > ul li.username > span.iconfont:last-of-type'),//名字修改键
    names= document.querySelector('#person_materrial .list > ul li.username > span:nth-of-type(2)');//名字输入框
// 改介绍
let introductions = document.querySelector('#person_materrial .list > ul li.introduction > span.iconfont:last-of-type'),
    intro = document.querySelector('#person_materrial .list > ul li.introduction > span:nth-of-type(2)');
    let flag = true;


let img = document.querySelector('#person_materrial .avater img');

//初始化
getUserInfo(userId,'avatar',img);
getUserInfo(userId,'nickname',names);
getUserInfo(userId,'introduction',intro);

changeInfo(userName1,'nickname',names);
changeInfo(introductions,'introduction',intro);

//改头像
submitAvater.onchange = function(e) {
    let file = e.target.files[0];
    // getFile(file,img); 都能用
    let url = getObjectURL(file);
    img.setAttribute('src',url);
    upload(file);
}

function upload(file) {
    let xhr = new XMLHttpRequest();
    xhr.open('post','http://vtmer.cn/changeUserAvatar', true);
    let formData = new FormData();
    formData.set('avatar', file);
    formData.set('userId', userId);
    xhr.send(formData)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            success(xhr);
        } 
    }
}
function success(xhr) {
    var data = JSON.parse(xhr.response).data;
    console.log(data.message);
}



// 获得用户信息
function getUserInfo(id,type,target) {
    getAjax('POST','http://vtmer.cn/login',{userId:id},3000,
    function(xhr) {
        if(type == 'avatar') {
            let img = JSON.parse(xhr.response).user.avatar;
            if (target) {
                target.setAttribute('src',img);
            }
            addcookie('avatar',img);
        }else if(type == 'nickname') {
            let names = JSON.parse(xhr.response).user.name;
            if (target) {
                target.innerText = names;
            }
            addcookie('nickname',names);
        }else if(type == 'introduction') {
            let introduction = JSON.parse(xhr.response).user.introduction;
            if (target) {
                target.innerText = introduction;
            }
            addcookie('introduction',introduction);
        }
    })
}


//修改用户信息  暂时只支持用户名和头像和简介     ---->其他方法相识
function changeInfo(amend,type,obj) {// 修改键，修改类型，修改框
    let recent;
    amend.onclick = function(e) {
        let target = e.target;
        if(flag) {
            flag = false;
            recent = obj.innerText;
            let input = `<input type="text" value = '${obj.innerText}' class='change_name'>`;
            obj.innerHTML = input;
            //添加按钮
            let add = `<button class='blue yes'>确定</button>
                        <button class='cancel'>取消</button>`;
            amend.innerHTML = add;
        }else {
            flag = true;
            if (target.classList.contains('yes')) {//确定
                let name1 = document.querySelector('input.change_name'),
                value = name1.value;
                 getUserInfo(userId,type);
                if (type == 'nickname') {
                    changeName({
                        userId:userId,
                        nickname:value,
                        introduction:getcookie('introduction')
                    })
                }
                else if (type == 'introduction') {
                    changeName({
                        userId:userId,
                        nickname:getcookie('nickname'),
                        introduction:value
                    })
                }
                /******************************有真实修改数据接口时不用**************************************/
                obj.innerHTML = `<span>${value = name1.value}</span>`;//
            }
            else if (target.classList.contains('cancel')) {//
                obj.innerHTML = `<span>${recent}</span>`;  
            }//
            /********************************************************************/
            amend.innerHTML = '&#xe508;修改';
            // getUserInfo(userId,type,obj);有真实修改数据接口时使用

        }
        
    }
}

//请求修改用户信息

function changeName(data) {
    getAjax('POST','http://vtmer.cn/changeUserInfo',data,3000,
    function(xhr) {
        console.log(JSON.parse(xhr.response).data.message);
    })
}


//返回个人页
let returnPerson = document.querySelector('#person_materrial .return .return_person');

returnPerson.onclick = function() {  
    personal.classList.add('show');
    personMaterrial.classList.remove('show');
}

