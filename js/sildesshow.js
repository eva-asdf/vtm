/**
 *轮播图 
 * 两个函数
 * 1.move -- 移动，实现图片切换
 * 2.start -- 规定如何轮播，一次start切换一张图
 * 
 * 鼠标移上图片时停止轮播，离开后2s再开始轮播
 * 点击圆点切换对应图片
 */


var view = document.querySelector('#view'),
    ul = document.querySelector('#view > ul'),
    lis = document.querySelectorAll('#view > ul > li')
    cirs = document.querySelectorAll('#view .cir span'),
    first = ul.children[0].cloneNode(true),
    viewWidth = view.offsetWidth,
    flag = true;
    ul.appendChild(first);
var timer,timer1,timer2;

//轮播图
function move(obj,target,callback) {
    clearInterval(timer2);
    timer2 = setInterval(function() {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(timer2);
                callback && callback();
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            obj.style.left = obj.offsetLeft + step + 'px';
    },20)
}

for (let i = 0; i < cirs.length; i++) {
    cirs[i].setAttribute('index', i);
}

cirs.forEach( value => {
    value.onclick = function() {
       
        if (flag) {
            for (let i = 0; i < 3; i++) {
                cirs[i].classList.remove('active');
            }
            value.classList.add('active');
            var index = this.getAttribute('index');
            num = index;
            cirNum = index;
            move(ul,-index*viewWidth);
            // start();
        }
       
    }
});

var num = 0,
    cirNum = 0;
function start() {
    if (flag) {

        flag = false;
        if (num == 3) {//最后一张图
            ul.style.left = 0;
            num = 0;
        }
        num++;
        for (let i = 0; i < 3; i++) {
            cirs[i].classList.remove('active');
        }
        
        if (num == 3) {
            cirs[0].classList.add('active');
        }else {
            cirs[num].classList.add('active');
        }
        move(ul, -num * viewWidth, function() {
            flag = true; //打开节流阀
        });
    }
}

timer1 = setInterval(function() {
    start();
   },2000)
  

view.addEventListener('mouseenter', function() {
    clearInterval(timer1);
})
view.addEventListener('mouseleave', function() {
    clearTimeout(timer1);
    timer1 = setInterval(function() {
     start();

    },2000)
})


