/**
 * *搜索界面*
 *  搜索展示
 *      搜索内容为空时，默认展示全部
 *      不为空时，展示书名相同书籍
 * 
 */
const main = document.querySelector('#main'),
      searchBtn = document.querySelector('#top_nav .layer form span'),
      searchName = document.querySelector('#search_box .search_name'),
      oinput = document.querySelector('#top_nav .layer form input'),
      pageWrap = document.querySelector('.page_wrap');
//初始化界面

if (!getcookie('search-key')) {
    showBook('http://vtmer.cn/search',{},0);
}else {
    searchName.innerHTML = getcookie('search-key');
    showBook('http://vtmer.cn/search1',{
        title:getcookie('search-key')
    },0);
}

//展示函数
function showBook(url,data,page) {
    main.innerHTML = '';
    getAjax(
        'POST',
        url,
        data,
        3000,
        function (xhr) {
            let arr = JSON.parse(xhr.response).bookclass[0].bookInfo,
                num = [],
                newArr = spArr(arr,8),
                pageNum = newArr.length; 
            if (arr.length == 0) {
                let  noBook = `<div class="none">
                                    暂无此书
                               </div>`;
                main.innerHTML = noBook;          
                return;
            }
            newArr[page].forEach((value,index) => {
               for(let j = 0; j < 5; j++){
                   if(value.socre > j) {
                       num[j] = "&#xe52a";
                   } else {
                    num[j] = "&#xe616";
                   }
               }
               var bookBox = document.createElement('div');
               bookBox.classList.add("books_box");
               let i = 0;
               var contents = `<img src="${value.cover}" alt="">   
                <div class="socre">
                    <span class="iconfont">${num[i++]}</span>               
                    <span class="iconfont">${num[i++]}</span>
                    <span class="iconfont">${num[i++]}</span>
                    <span class="iconfont">${num[i++]}</span>
                    <span class="iconfont">${num[i++]}</span>
                </div>
                <p class="boox">${decodeURIComponent(value.title)}</p> 
                <p class="ahthor">${value.author}</p>`;
                /**************decodeURIComponent 将 形如%E7%99%BD%E5%A4%9C%E8%A1%8C 解码*********************/
                bookBox.innerHTML = contents;
                main.appendChild(bookBox);
                
               //详情页               
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
                    showBook(url,data,i);
                }
            }
            pageWrap.innerHTML = '';
            pageWrap.appendChild(ol);
        }
    );

}




searchBtn.onclick = function() {
    searchName.innerHTML = oinput.value;
    if (oinput.value.trim() == '') {
        showBook('http://vtmer.cn/search',{},0);
        deleteCookie('search-key');
       return;
    }
    showBook('http://vtmer.cn/search1',
            {   
                title: oinput.value
            },0)
}


let toClass = document.querySelectorAll('.classify .hid a');
toClass.forEach((value,index) => {
    value.onclick = function() {
        addcookie('classId',index);//添加cookie
    }
})