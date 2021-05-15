/**
 * *登录界面*
 * 登录验证
 *     名字：英文
 *     密码：6-10位数字
 * 
 * 大类跳转
 *     点击大类跳转页面
 * 
 * 搜索跳转
 *     点击放大镜跳转页面
 */
var person = document.querySelector(".person"),
    personNav = document.querySelector(".person_box .hide"),
    personNavLi = personNav.querySelectorAll('li');
    closeLogin = document.querySelector('.close'),
    loginWrap = document.querySelector('.login_wrap'),
    submit = document.querySelector(".login_wrap .login form input[type='submit']"),
    avatar = document.querySelector('.person_box img');

let userId;


let flag;
document.onclick = function(e) {
    var target = e.target;
    if (target == avatar) {
            flag = personNav.classList.contains('show');
            personNav.classList.toggle('show');      
        
    }else if (target == person) {
        loginWrap.classList.add('show');
    }
    else if (target != avatar && flag == false) {
        flag = personNav.classList.contains('show');
        personNav.classList.toggle('show');
    }

}

personNavLi[0].onclick = function() {
    addcookie('userId',userId);
}

personNavLi[2].onclick = function() {
    person.setAttribute('data-status','0');
    person.innerHTML = '&#xe515';
    personNav.classList.remove('show');
}


closeLogin.onclick = function() {
    loginWrap.classList.remove('show');
}

var userName = document.querySelector('input.name'),
    userpassword = document.querySelector('input.password'),
    loadingBox = document.querySelector('.loading_box'),//加载框
    round = document.querySelectorAll('.loading_box .loading div span'),//加载圆点
    timer1,timer2,
    key = 0;

function inLogin() {
        // 判断名字是否为全英
    getAjax(
        'POST',
        'http://vtmer.cn/login',
        {},
        3000,
        function (xhr) {
            console.log(JSON.parse(xhr.response).user);
            let data = JSON.parse(xhr.response).user,
                names = data.name,
                password = data.password,
                avatarSrc = data.avatar;
                userId = data.userId;
                addcookie('userId',userId);
            /***************正则判断**********************/
            let reg1 = /^[a-zA-Z]+$/,
                reg2 = /^[1-9]{6,10}$/;
            if(userName.value == names && userpassword.value == password) {
                /***********让登录状态切换为已登录********************/
                // person.innerHTML = names;
                person.classList.remove('show');
                avatar.setAttribute('src',avatarSrc);
                avatar.classList.add('show');
                /********** 加载 **************/
                 
                loginWrap.classList.remove('show');
                loadingBox.classList.add('show');
                timer1 = setInterval(function() {
                    for(let i = 0; i < 3; i++){
                        round[i].classList.remove('active');
                    }
                    round[key].classList.add('active');
                    key++;
                    if (key >= 3) {
                        key = 0;
                    }
                },200)
                timer2 = setTimeout(function() {
                    clearInterval(timer1);
                    clearTimeout(timer2);
                    loadingBox.classList.remove('show');
                    showError('登录成功');
                },2000)
                /*****************************/
            }
            else if (reg1.test(userName.value) && reg2.test(userpassword.value)) {
                console.log(12);
                showError('账号或密码错误');
            }      
        }
    );
    return false;
}


//大类点击跳转
let toClass = document.querySelectorAll('.classify a');

toClass.forEach((value,index) => {
    value.onclick = function() {
        addcookie('classId',index);//添加cookie
    }
})



/***********************登录验证**************************************************/

userName.oninvalid = function() {
    this.setCustomValidity('请输入英文昵称');
}

userpassword.oninvalid = function() {
    this.setCustomValidity('请输入长度为6-10的数字');
}

userName.oninput = function() {
    this.setCustomValidity('');
}

userpassword.oninput = userName.oninput;

/*******************搜索跳转***************************/
let searchBtn = document.querySelector('div.box form > span'),
    searchinput = document.querySelector('div.box form > input');    


//聚焦时‘搜索’消失
searchinput.onfocus = function() {
    searchinput.setAttribute('placeholder','');
}

searchinput.onblur = function() {
    searchinput.setAttribute('placeholder','搜索');
}