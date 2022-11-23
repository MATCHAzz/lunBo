function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //步长公式：（目标值-现在的位置）/10
        var step = (target - obj.offsetLeft) / 10;
        //小数为正往大的取，为负往小的取
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (target == obj.offsetLeft) {
            //停止动画
            clearInterval(obj.timer);
            //回调函数写在定时器结束里面，因为是动画运行完才执行
            if (callback) {
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)

}