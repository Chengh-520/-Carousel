/* 
    obj:需要做动画的对象
    arrt:需要做动画的样式
    target:动画执行的目标值
    speed:动画执行的速度
    callback:回调函数
*/
function move(obj,arrt,target,speed,callback) {
    // 关闭上一个定时器
    clearInterval(obj.itmer);

    // 获取元素样式
    let current = parseInt(getStyle(obj, arrt));
    
    // 判断速度的正负值
    if(current > target) {
        speed = - speed;
    }

    obj.itmer = setInterval(function () {
        // 获取元素样式
        let oldValue = parseInt(getStyle(obj, arrt));
        // 创建元素新样式
        let newValue = oldValue + speed;

        // 元素超过目标值，将目标值赋值给元素
        if ((speed > 0 && newValue > target) || (speed < 0 && newValue < target)) {
            newValue = target;
        }

        obj.style[arrt] = newValue + 'px';

        // 到达目标值关闭定时器
        if (newValue == target) {
            clearInterval(obj.itmer);

            // 判断回调函数是否调用
            callback && callback();
        }
    }, 15)
}

function getStyle(obj, name) {
    // if(window.getComputedStyle){
    //     // 正常浏览器的方式
    //     return getComputedStyle(obj , null)[name];
    // }else{
    //     // IE8的方式
    //     return obj.currentStyle[name];
    // }

    return window.getComputedStyle ? getComputedStyle(obj, null)[name] : obj.currentStyle[name];

}