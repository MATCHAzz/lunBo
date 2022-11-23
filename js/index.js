window.addEventListener('load', function () {
    var left = this.document.querySelector('.left');
    var right = this.document.querySelector('.right');
    var box = this.document.querySelector('.box');
    // 1.左右箭头的显示
    box.addEventListener('mouseenter', function () {
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(timer);
        timer=null //清除定时器变量
    })
    box.addEventListener('mouseleave', function () {
        left.style.display = 'none';
        right.style.display = 'none';
        timer=this.setInterval(function(){
            // 手动调用点击事件
            right.click();
        },2000);
    })

    // 2.动态生成小圆圈
    // 要加限定，是box里面的ul，在正式开发中太多ul了
    var ul = box.querySelector('ul');
    var ol = box.querySelector('ol');
    var boxWidth = box.offsetWidth;
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li
        var li = document.createElement('li');
        // 记录小圆圈的索引号，用自定义属性来做
        li.setAttribute('index', i);
        // 把li插入到ol里面
        ol.appendChild(li);
        // 3.小圆圈的排他思想
        li.addEventListener('click', function () {
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 4.点击小圆圈，移动图片，移动的是ul
            // ul的移动距离：小圆圈的索引号乘以图片的宽度，注意是负值（向左）
            // 当我们点击了哪个小li就拿到了当前小li的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li，就要把这个li的索引号给num
            num = index;
            // 当我们点击了某个小li，就要把这个li的索引号给circle
            circle = index;
            animate(ul, -index * boxWidth);
        })
    }
    ol.children[0].className = 'current';
    // 5.克隆第一张照片（li）放到ul最后面 (深克隆)
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 6.点击右键按钮，图片向右移
    var num = 0;
    var circle = 0;
    right.addEventListener('click', function () {
        // 如果走到了最后一张复制的照片，此时要将ul快速复原left为0
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            // 从头开始滚动
            num = 0;
        }
        num++;
        animate(ul, -num * boxWidth);
        // 7.点击右侧按钮，下面小圆圈跟着一起变化
        circle++;
        // 如果circle==4，说明走到我们克隆的这张照片了，要复原
        if (circle == ol.children.length) {
            circle = 0;
        }
        circleChange();
    })

    // 8.左侧按钮做法
    left.addEventListener('click', function () {
        // 如果走到了第一张照片，此时要将ul快速复原left为最后一张
        if (num == 0) {
            ul.style.left = (ul.children.length - 1) * boxWidth + 'px';
            // 从尾开始滚动
            num = ul.children.length - 1;
        }
        num--;
        animate(ul, -num * boxWidth);
        // 9.点击左侧按钮，下面小圆圈跟着一起变化
        circle--;
        // 如果circle<0，说明走到我们第一张照片了，要改为第四个小圆圈(3)
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        circleChange();
    })
    function circleChange(){
        // 先清除全部的样式
        for (i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前小圆圈类名
        ol.children[circle].className = 'current';
    }
    // 10.自动播放轮播图
    var timer=this.setInterval(function(){
        // 手动调用点击事件
        right.click();
    },2000);
})