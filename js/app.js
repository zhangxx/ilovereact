/**
 * Created by zhangxiaoxue on 15/9/25.
 */
window.onload = function() {
    animateLogo();
    animateRobot();
    updateSliderControl();
};

// 使用 onscroll 回调函数来更新 slider
window.onscroll = function() {
    // ...
    updateSliderControl();
    addSmoothScrolling();
}

function updateSliderControl() {
    // 获得所有的 slider 链接
    var links = document.querySelectorAll("#slider-control a");
    for(var i = 0; i < links.length; i++) {
        var link = links[i];

        // 获取被链接指向的部分
        var section = document.querySelector(link.getAttribute("href"));
        var box = section.getBoundingClientRect();
        var sectionTop =box.top+window.pageYOffset-section.clientTop;
        var sectionBottom =box.bottom+window.pageYOffset-section.clientTop;



        // 检查 window.scrollY 是否在这部分中
        if(window.scrollY >= sectionTop && window.scrollY < sectionBottom) {

            link.className = "active";
          //  console.log(i+":"+window.scrollY+";"+sectionTop+","+sectionBottom);

        } else {
            link.className = "";
        }
    }
}


function scrollToElement(element) {
    var topOfElement =element.getBoundingClientRect().top+window.pageYOffset-element.clientTop;

    TweenMax.to(window,2,{
        scrollTo: {
            y: topOfElement,
        },

        ease: Power2.easeInOut,
    });
}


function addSmoothScrolling() {
    var links =document.querySelectorAll("#slider-control a");

    for(var i = 0; i < links.length; i++) {

        (function(){
            var link = links[i];
            link.addEventListener("click",function(event) {
                // `event` 是鼠标点击事件
                event.preventDefault();
                // BUG 警告！使用闭包或者 ES6 `let` 修复。
                var href = link.getAttribute("href");
                var element=document.querySelector(href);
                scrollToElement(element);
                console.log(href);
            });

        })();


    }
}




function animateRobot() {
    var t = new TimelineMax({yoyo: false, repeat: -1});
    t.to("#android-robot",1,{rotation: "-30deg"})
        .to("#android-robot",1,{rotation: "-60deg"});
}

function animateLogo(){
    TweenMax.fromTo("#logo",1, {
            // from
            css: {
                y: "-50px",
            }
        },{
            // to
            css: {
                y: "50px",
            },

            // 永久重复动画的选项
            repeat: -1,

            // 反转、重新运行动画的选项
            yoyo: true,

            // 改变 easing 类型
            ease: Power2.easeInOut,
        }
    );
}
