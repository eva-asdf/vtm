let details_box = document.querySelector('#details'),//详情页
    bookName = details_box.querySelector('.details_box .boox_name')
    author = details_box.querySelector('.details_box .author span:last-of-type'),//作者
    publish = details_box.querySelector('.details_box .publish span:last-of-type'),//出版社
    time = details_box.querySelector('.details_box span.time'),//出版时间
    booksNum = details_box.querySelector('.details_box span.num'),//书数
    locate = details_box.querySelector('.details_box span.locate'),//位置
    ahthorIntro = details_box.querySelector('.author_summary'),//作者介绍
    bookIntro = details_box.querySelector('.book_summary'),//书本介绍
    doubang = document.querySelector('.doubang'),//豆瓣
    zhihu = document.querySelector('.zhihu'),//知乎
    jd = document.querySelector('.jd'),//京东
    Dang = document.querySelector('.Dang'),//当当
    Amazon = document.querySelector('.Amazon'),//亚马逊
    closeDetails = details.querySelector('.close span'),
    aside = details_box.querySelector('.aside'),
    asideLi = aside.querySelectorAll('li');


//关闭详情页
closeDetails.onclick = function() {
    // window.history.go(-1);
    history.back();//不刷新页面 
    // addcookie('return',1);
} 

//详情页
let obj;

obj = JSON.parse(getcookie('details'));
showDetails(obj);

function showDetails(obj) {
    asideLi.forEach(value => {
        value.classList.remove('active');
    });
    // main.style.display = 'none';
    bookName.innerText = decodeURIComponent(obj.title);
    author.innerText = obj.author;
    publish.innerText = obj.publish;
    time.innerText = obj.publishDate;
    booksNum.innerText = obj.library[0].total;
    locate.innerText = obj.library[0].position;
    ahthorIntro.innerText = obj.ahthorIntro;
    bookIntro.innerText = obj.bookIntro;
    doubang.href = 'http://' + obj.bookUrl[0].doubanUrl;
    zhihu.href = 'http://' + obj.bookUrl[0].zhihuUrl;
    jd.href = 'http://' + obj.buyUrl[0].jDUrl;
    Dang.href = 'http://' + obj.buyUrl[0].DangUrl;
    Amazon.href = 'http://' + obj.buyUrl[0].AmazonUrl;
    console.log(obj.isLike);
    if (obj.isLike) {
        asideLi[0].classList.add('active'); 
    }else {
        asideLi[0].classList.remove('active'); 
    }
    details_box.classList.add('show');
}

/*************************侧边互动*************************/

aside.onclick = function(e) {
    let target = e.target,
    data = target.dataset.aside,
    url;
    if (data && !target.classList.contains('active')) {
        url = data == 1? 'http://vtmer.cn/likeBook':'http://vtmer.cn/collect';
        console.log(url);
        console.log(target);
        bookInteract(target,url);
    }else if (data && target.classList.contains('active')) {
        url = data == 1? 'http://vtmer.cn/cancleLikeBook':'http://vtmer.cn/cancleCollect';
        bookInteract(target,url);
    }
}


//侧边互动
function bookInteract(obj,url) {
    getAjax(
        'POST',
        url,
        {
            articleId:getcookie('articleId')
        },
        3000,
        function(xhr) {//收藏成功
            let message = JSON.parse(xhr.response).message;
            console.log(message);
            if (message == '点赞成功' || message == '收藏成功') {
                console.log(1);
                obj.classList.add('active');
            }if (message == '取消点赞成功' || message == '取消收藏成功') {
                obj.classList.remove('active');
            }
        }
    )
}