window.onload = function () {
  // # 1. 获取元素
  let buttonL = document.querySelector('.iconl') //获取左按钮
  let buttonR = document.querySelector('.iconr') //获取右按钮
  let img_left = document.querySelector('.img-left') //获取整个左边区域
  let viewpager = img_left.querySelector('.viewpager') //获取所有轮播图ul
  let img = viewpager.querySelector('img') //获取每张轮播图
  let B_button = document.querySelector('.bottom-button').querySelector('ul') //获取所有底部小按钮ul
  let index = 0 //给index一个初始值
  let imgwidth = img.offsetWidth //每张轮播图片的宽度
  // # 2. 鼠标经过 就显示/隐藏左右按钮
  //鼠标经过
  img_left.addEventListener('mouseenter', function () {
    buttonL.style.opacity = 1
    buttonR.style.opacity = 1 //显示
    // # 8.1 自动播放轮播图 优化：鼠标经过 就停止
    clearInterval(time)
    time = null // 清除定时器变量
  })
  //鼠标离开
  img_left.addEventListener('mouseleave', function () {
    buttonL.style.opacity = 0
    buttonR.style.opacity = 0 //隐藏
    // # 8.2 自动播放轮播图 优化：鼠标移出 就开始
    time = setInterval(function () {
      //手动调用点击事件1
      buttonR.click()
    }, 2000)
  })

  // # 3. 为了实现无缝滚动-克隆第一张图片的li放到最后
  let clonefirst = viewpager.children[0].cloneNode(true) //深拷贝第一张轮播图
  viewpager.appendChild(clonefirst) //向节点添加最后一个子节点

  // # 4. 有几张轮播图就动态生成几个底部小圆圈
  //遍历轮播图的ul
  for (let i = 0; i < viewpager.children.length - 1; i++) {
    let li = document.createElement('li') // 创建一个li
    li.setAttribute('index', i) // 将li创建index属性并赋值
    B_button.appendChild(li) // 把小li插入到ul里面

    // # 5. 鼠标点击底部小按钮 点击的那个会变色
    B_button.children[0].className = 'first' //给底部按钮的第一张图片样式
    li.addEventListener('click', function () {
      //遍历底部按钮ul 清空样式
      for (let i = 0; i < B_button.children.length; i++) {
        B_button.children[i].className = ''
      }
      //点击后 给样式
      li.className = 'current'

      // # 6. 点击小圆点 跳转图片ul
      // ul的移动距离 = 小圆圈的索引号 * 图片的宽度
      // let imgwidth = img.offsetWidth //每张轮播图片的宽度
      index = this.getAttribute('index') //点击谁就得到当前的索引号
      animate(viewpager, -index * imgwidth)
    })
  }

  // # 7.4 优化3：快速点击 图片会快速轮播 需要节流阀限制快速轮播
  let flag = true // 设置一个变量 flag 节流阀
  // # 7. 点击右侧按钮，底部按钮跟右侧一起变化
  buttonR.addEventListener('click', function () {
    // # 7.2 优化1：轮播图片限定范围 限定右边 实现无缝滚动效果
    if (flag) {
      //点击一次后关闭
      flag = false

      index == viewpager.children.length - 1
        ? (viewpager.style.left = 0)
        : index
      index == viewpager.children.length - 1 ? (index = 0) : index
      index++

      //点击小按钮 让索引号自加

      console.log(index)
      console.log(-index * imgwidth)
      animate(viewpager, -index * imgwidth, function () {
        flag = true // 利用回调函数 动画执行完毕后 赋值为true,可以执行if里面的运算
      })

      // # 7.1 绑定底部小按钮 跟随轮播图一起变化
      for (let i = 0; i < B_button.children.length; i++) {
        B_button.children[i].className = ''
      }
      // # 7.3 优化2：轮播到第5张图的时候 底部按钮点亮第1个
      let circle = index
      circle == viewpager.children.length - 1 ? (circle = 0) : circle
      B_button.children[circle].className = 'current'
    }
  })
  buttonL.addEventListener('click', function () {
    if (flag) {
      flag = false
      console.log(-index * imgwidth)
      // index == 0 ? (viewpager.style.left = -4580 + 'px') : index
      if (index == 0) {
        index = viewpager.children.length - 1
        viewpager.style.left = -index * imgwidth + 'px'
      }
      index == 0 ? (index = viewpager.children.length - 1) : index

      index--
      animate(viewpager, -index * imgwidth, function () {
        flag = true
      })
      for (let i = 0; i < B_button.children.length; i++) {
        B_button.children[i].className = ''
      }
      let circle = index
      circle == viewpager.children.length - 1 ? (circle = 0) : circle
      B_button.children[circle].className = 'current'
    }
  })

  // # 8. 自动播放轮播图
  let time = setInterval(function () {
    //手动调用点击事件
    buttonR.click()
  }, 2500)
}
