/**
 * *书本详情界面*
 *  展示书本详情内容
 *      
 *  搜索跳转
 *     回车，点击放大镜跳转页面
 * 
 *  点击 X 返回上一页
 *  
 *  侧边栏互动
 *      支持点赞，收藏
 *      点击分数按钮，展示书籍评分
 *  
 */

let details_box = document.querySelector('#details'),//详情页
    bookName = details_box.querySelector('.details_box .boox_name')
    author = details_box.querySelector('.details_box .author span:last-of-type'),//作者
    publish = details_box.querySelector('.details_box .publish span:last-of-type'),//出版社
    time = details_box.querySelector('.details_box span.time'),//出版时间
    booksNum = details_box.querySelector('.details_box span.num'),//书数
    locate = details_box.querySelector('.details_box span.locate'),//位置
    ahthorIntro = details_box.querySelector('.author_summary'),//作者介绍
    bookIntro = details_box.querySelector('.book_summary'),//书本介绍
    doubanUrl = document.querySelector('.doubanUrl'),//豆瓣
    zhihuUrl = document.querySelector('.zhihuUrl'),//知乎
    jDUrl = document.querySelector('.jDUrl'),//京东
    DangUrl = document.querySelector('.DangUrl'),//当当
    AmazonUrl = document.querySelector('.AmazonUrl'),//亚马逊
    closeDetails = details.querySelector('.close span'),
    aside = details_box.querySelector('.aside'),
    asideLi = aside.querySelectorAll('li'),
    socre = asideLi[2].querySelector('span');
let url = document.querySelectorAll('.url');
//关闭详情页
closeDetails.onclick = function() {
    history.back();
} 

//详情页
let obj;

obj = JSON.parse(getcookie('details'));
showDetails(obj);

function showDetails(obj) {
    //展示icon
    url.forEach(value => {
        value.style.display = 'inline';
    })
    //除去侧边栏元素活跃状态
    asideLi.forEach(value => {
        value.classList.remove('active');
    });

    //将当获取不到其中一项信息显示：待更新
    for(let p in obj) {
        if (!obj[p]) {
            obj[p] = '待更新';
        }
    } 
    //若是icon，则直接不显示
    for(let p in obj.bookUrl[0]) {
        if (!obj.bookUrl[0][p]) {
            document.querySelector('.'+p).style.display = 'none';
        }
    }
    for(let p in obj.buyUrl[0]) {
        if (!obj.buyUrl[0][p]) {
            document.querySelector('.'+p).style.display = 'none';
        }
    }

    bookName.innerText = decodeURIComponent(obj.title);
    author.innerText = obj.author;
    publish.innerText = obj.publish;
    time.innerText = obj.publishDate;
    booksNum.innerText = obj.library[0].total;
    locate.innerText = obj.library[0].position;
    ahthorIntro.innerText = obj.ahthorIntro;
    bookIntro.innerText = obj.bookIntro;
    doubanUrl.href = 'http://' + obj.bookUrl[0].doubanUrl;
    zhihuUrl.href = 'http://' + obj.bookUrl[0].zhihuUrl;
    jDUrl.href = 'http://' + obj.buyUrl[0].jDUrl;
    DangUrl.href = 'http://' + obj.buyUrl[0].DangUrl;
    AmazonUrl.AmazonUrl = 'http://' + obj.buyUrl[0].AmazonUrl;
    if (obj.isLike) {
        asideLi[0].classList.add('active'); 
    }else {
        asideLi[0].classList.remove('active'); 
    }
    // 书籍评分
    for(let i = 0; i < 5; i++) {
        if (i < obj.socre) {
            socre.innerHTML += '&#xe52a;'
        }else {
            socre.innerHTML += '&#xe616;'
        }
    }
    details_box.classList.add('show');
}

/*************************侧边互动*************************/

aside.onclick = function(e) {
    let target = e.target,
    data = target.dataset.aside,
    url;
    if (data && !target.classList.contains('active')) {
        url = data == 1? 'http://vtmer.cn/likeBook':'http://vtmer.cn/collectbook';
        bookInteract(target,url);
    }else if (data && target.classList.contains('active')) {
        url = data == 1? 'http://vtmer.cn/cancleLikeBook':'http://vtmer.cn/cancleCollect';
        bookInteract(target,url);
    }
}

//侧边互动之点赞，收藏
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
            if (message == '点赞成功' || message == '收藏成功') {
                console.log(1);
                obj.classList.add('active');
            }if (message == '取消点赞成功' || message == '取消收藏成功') {
                obj.classList.remove('active');
            }
        }
    )
}

/*******************搜索跳转***************************/
let searchBtn = document.querySelector('#top_nav form > span'),
    searchinput = document.querySelector('#top_nav form > input');    