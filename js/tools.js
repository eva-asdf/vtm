function changeArray(obj){
    var arr = [];
    for(var i in obj){
        arr.push(encodeURIComponent(i)+"="+encodeURIComponent(obj[i]));
    }
    obj.time = new Date().getTime();
    return arr.join("&");
}

function getAjax(type,url,obj,timeout,success,error){ 
    var str = changeArray(obj);          
    var xmlhttp,
        timer;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject();
    }

    if (type == 'GET') {
        xmlhttp.open(type,url+'?'+str, true);
        xmlhttp.send();
    }else {
        xmlhttp.open(type,url, true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(str);
    }

    xmlhttp.onreadystatechange = function(e){
        if(xmlhttp.readyState === 4){
            clearInterval(timer);
            if((xmlhttp.status>=200 && xmlhttp.status< 300) || xmlhttp.status ===304){
                success(xmlhttp);
            }
            else{
                error(xmlhttp);
            }
        }
    }
    if(timeout){
        timer = setInterval(() => {
           xmlhttp.abort();
           console.log('超时,请求失败'); 
           clearInterval(timer);
        }, timeout);
    } 
}

//增加cookie
function addcookie(key,value,time,path,domain){
    var index = window.location.pathname.lastIndexOf("/");
    var currrentPath = window.location.pathname.slice(0,index)
    path = path || currrentPath;
    domain = domain || document.domain;
    if(!time){
        document.cookie = key+"="+value+";path="+path+";domain="+domain+";";
    }else{
        var date = new Date();
        date.setDate(date.getDate() + time);
        document.cookie = key+"="+value+";expires="+date.toUTCString()+";path="+path+";domain="+domain+";";
    }
}

//查看cookie
function getcookie(key){
   let res = document.cookie.split(';');
   for(let i = 0; i < res.length; i++) {
        var tem = res[i].split('=');
        if (tem[0].trim() === key) {
            return tem[1];
        }
   }
}

// 删除cookie
function deleteCookie(key) {
    addcookie(key,'',-1);
}

//登录错误弹出框
function showError(message) {
    let errorBox =document.querySelector('.error');
    errorBox.style.display = 'block';
    errorBox.innerHTML = message;
    // closeLogin.click();
    setTimeout(function() {
        errorBox.style.display = 'none';
    },2000)
        
}


// 分割数组
function spArr(arr, num) {
	let newArr = [];
	for (let i = 0; i < arr.length;) { //  !!  这里与for循环不太一样的是，没有i++
		newArr.push(arr.slice(i, i += num)); 
	}
	return newArr
}


//展示class类的书
function show(main,index,page,pageWrap,url) {//index是第几类，page是第几页  ,pageWrap是页数按钮
    main.innerHTML = '';
    getAjax(
        'POST',
        url,
        {},
        3000,
        function (xhr) {
            let arr = JSON.parse(xhr.response).bookclass[index].bookInfo,
                num = [],
                newArr = spArr(arr,8),
                pageNum = newArr.length;
            newArr[page].forEach(value => {
               for(let j = 0; j < 5; j++){
                   if(value.socre > j) {
                       num[j] = "&#xe52a";
                   } else {
                    num[j] = "&#xe616";
                   }
               }
               var bookBox = document.createElement('div');
               bookBox.classList.add("books_box");
               bookBox.setAttribute('data-article-id',value.articleId);
               let i = 0;
               var contents = `<img src="${value.cover}" alt="">   
                <div class="socre">
                    <span class="iconfont">${num[i++]}</span>               
                    <span class="iconfont">${num[i++]}</span>
                    <span class="iconfont">${num[i++]}</span>
                    <span class="iconfont">${num[i++]}</span>
                    <span class="iconfont">${num[i++]}</span>
                </div>
                <p class="boox">${value.title}</p>
                <p class="ahthor">${value.author}</p>`;
                bookBox.innerHTML = contents;
                main.appendChild(bookBox);
                bookBox.onclick = function() {
                    addcookie('articleId',this.dataset.articleId);
                    addcookie('details',JSON.stringify(value));
                    window.location.href = '../details.html';
                }
            });
            let ol = document.createElement('ol');
            ol.className = 'page';
            for(let i = 0; i < pageNum; i++)
            {
                let li = document.createElement('li')
                li.innerText = i + 1;
                ol.appendChild(li);
                li.onclick = function() {
                    show(main,index,i,pageWrap,url);
                }
            }
            pageWrap.innerHTML = '';
            pageWrap.appendChild(ol);
        }
    );
}


//获取文件路径
function getObjectURL(file) {
    let url;
    if (window.createObjectURL) {
        
    }else if (window.URL) {
        url = window.URL.createObjectURL(file);
    }else if (window.webkitURL) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}


//获取图片
function getFile(file,img) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        let result = reader.result;
        // src = result;
        img.setAttribute('src',result);
    }
}


//点击icon跳转
function searchJump() {
    addcookie('search-key',searchinput.value);
    window.location.href = 'search.html';
}
//回车跳转
function searchReturn(e) {
    if(e.keyCode == 13) {
        searchJump();
        return false;
    }
}
