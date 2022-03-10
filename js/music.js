window.addEventListener('load', function () {

    var banner = this.document.querySelector('.banner');
    var imgAll = this.document.querySelector('.imgAll');
    var music = this.document.querySelector('.music');
    var mimg = this.document.querySelector('.m_img');
    var mtext = this.document.querySelector('.m_text');
    var mprey = this.document.querySelector('.m_prey');
    var mplay = this.document.querySelector('.m_play');
    var mpause = this.document.querySelector('.m_pause');
    var mnext = this.document.querySelector('.m_next');
    var mclose = this.document.querySelector('.m_close');
    var mmp3 = this.document.querySelector('.m_mp3');
    var flag = false;//判断是否播放

    var close = true;//判断是否隐藏关闭
    var index = 1;
    //点击图片改变背景
    //设置Index属性
    for (var i = 0; i < imgAll.children.length; i++) {
        // console.log(imgAll.children[i])
        imgAll.children[i].setAttribute('index', i);
        // 为每个图片绑定事件
        imgAll.children[i].addEventListener('click', function () {

            index = parseInt(this.getAttribute('index')) + 1;

            show();
        })
    }
    //更换所有变化
    function show() {
        change_bg(index);
        // console.log(index)
        change_img_text(index);//播放器图片及文本
        change_play();//播放按钮
        img_rotate(index);//图片旋转
        play_mp3(index);//播放歌曲
    }
    //改变背景
    function change_bg(idx) {
        $("body").css({
            "background": "url(imgs/" + idx + ".jpg) no-repeat",
            "background-size": "cover"
        })
    }

    //改变播放器图片+文本
    function change_img_text(idx) {
        mimg.src = "img/" + idx + ".jpg";//替换图片
        // console.log(mimg.src)
        mtext.innerHTML = imgAll.children[idx - 1].title;//替换文字
    }

    //播放按钮改变title以及暂停
    function change_play() {
        mplay.className = 'm_pause';
        mplay.title = '暂停';

    }

    //图片旋转
    function img_rotate(idx) {
        for (var j = 0; j < imgAll.children.length; j++) {
            imgAll.children[j].classList.remove('rotate');
        }
        imgAll.children[idx - 1].classList.add('rotate');
        // console.log(imgAll.children[idx - 1].className)
    }

    //播放音乐
    function play_mp3(idx) {
        mmp3.src = "D:/前端学习/workspace/music/mp3/" + idx + ".mp3"
        // console.log(mmp3.src);
        mmp3.play();//播放歌曲
        flag = true;
    }
    //暂停或者播放歌曲
    mplay.addEventListener('click', function () {
        // 暂停歌曲
        // 图片停止旋转
        // 图标显示为停止
        // 图标title改变
        if (flag == true) {
            mmp3.pause();
            flag = false;
            for (var j = 0; j < imgAll.children.length; j++) {
                imgAll.children[j].classList.remove('rotate');
            }
            mplay.className = 'm_play';
            mplay.title = '播放';

        } else {
            mmp3.play();

            mplay.className = 'm_pause';
            mplay.title = '暂停';
            //确保旋转正确
            // if (index == 1) {
            //     imgAll.children[index].classList.add('rotate');
            // } else {
            imgAll.children[index - 1].classList.add('rotate');
            // }
            flag = true;
        }
        //确保背景图片开始与以后显示正确
        // if (index == 0) {
        //     change_bg(index + 1)
        // } else (
        change_bg(index)
        // )

    })
    //上一首
    mprey.addEventListener('click', function () {
        index--;
        if (index < 1) {
            index = imgAll.children.length;
        }
        show();
    })
    //下一首
    mnext.addEventListener('click', function () {
        index++;
        if (index > imgAll.children.length) {
            index = 1;
        }
        show();
    })
    //缓动动画
    // function animate(obj, target, callBack) {
    //     clearInterval(obj.timer);//先清除之前定时器，保证当前只有一个定时器在执行，不然会加速，闪烁这些bug
    //     obj.timer = window.setInterval(function () {
    //         //注意这里每一步的距离公式，因为除法会有小数，防止移动不到target处，我们需要以整数运动。
    //         //匀速减小的步长公式：（目标-当前位置）10
    //         var step = (target - obj.offsetLeft) / 10;
    //         step = step > 0 ? Math.ceil(step) : Math.floor(step);
    //         if (obj.offsetLeft == target) {
    //             clearInterval(obj.timer);
    //             //回调函数写在定时器内。
    //             //因为回调函数是在执行完后再来执行的函数，当定时器结束再来实现该函数
    //             // if (callBack) {
    //             //     callBack();
    //             // }
    //             callBack && callBack();
    //         } else {
    //             obj.style.left = obj.offsetLeft + step + 'px';
    //             //这是变速动画即缓动动画
    //             //若为匀速动画则step为固定的值  
    //         }

    //     }, 50)
    // }
    //隐藏与显示
    mclose.addEventListener('click', function () {
        if (close) {
            mclose.classList.add('m_open');

            $(".music").animate({ "left": "-545px" }, 800);//JQuery方法实现缓动
            close = false;
            //animate(music, -545);//js实现移动

        } else {

            // animate(music, 0);
            mclose.classList.remove('m_open');
            $(".music").animate({ "left": "0px" }, 800);
            close = true;
        }


    })
})