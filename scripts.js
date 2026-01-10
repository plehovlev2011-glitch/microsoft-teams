$(function(){
    setTimeout(function(){
        scrollTo(0,-1);
    },0);

    var i = 1;
    var t = 1;
    var imgt = 1;
    var down = 0;
    var timer = 0;

    // Инициализация аудио
    var clickSound = document.getElementById('clickSound');
    
    // Обработчики для кнопок
    $('.styled-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var link = $(this).data('link');
        
        // Воспроизведение звука
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(function(error) {
                console.log('Audio play failed:', error);
            });
        }
        
        // Анимация нажатия
        $(this).addClass('clicked');
        setTimeout(function() {
            $(this).removeClass('clicked');
        }.bind(this), 300);
        
        // Переход по ссылке с задержкой
        setTimeout(function() {
            if (link) {
                // Проверяем, нужен ли протокол
                if (link.startsWith('http') || link.startsWith('https')) {
                    window.open(link, '_blank');
                } else if (link.startsWith('t.me')) {
                    window.open('https://' + link, '_blank');
                } else {
                    window.open('https://' + link, '_blank');
                }
            }
        }, 200); // Задержка для звука
    });

    $("html,body").scrollTop(0);

    $("img").width($(window).width());

    $(window).on("click",function(e){
        // Проверяем, не кликнули ли по кнопке
        if ($(e.target).closest('.styled-btn').length === 0) {
            if($(window).scrollTop() == 0){
                $("html,body").animate({"scrollTop":$(".viewport").height()})
            }
        }
    })

    function init(){
        $("img").width($(window).width());
    }

    $(window).on("resize",function(){
        init();
    });

    $(window).on("scroll",function(){
        var cur = $(window).scrollTop();
        
        //Image sizing
        if(t == 0){
            var math = cur - $(".viewport").height()*(i-1);
            $("img").height(math);
        }else{
            var math = $(".viewport").height()*(i)- cur;
            $("img").height(math);
        }

        //trigger
        if(cur > $(".viewport").height()*i){
            i++;
            togglePosition();
            $("html,body").height($("html,body").height()+$(".viewport").height())
        }

        //scrolling up
        if(cur + 5 < $(".viewport").height()*i - ($(".viewport").height())){
            i--;
            togglePosition();
            down = 1;
        }

        //reset 
        if(cur <= 0){
            $(".page.a").removeClass("a");
            $(".page").eq(0).addClass("a");
        }

        //change text
        if($("img").height() == $(".viewport").height() && cur > 10){
            if(timer == 0){
                timer = 1;
                text();
                setTimeout(function(){
                    timer = 0;
                },300)
            }
        }

        //alternate images
        if($("img").height() <= 0){
            if (imgt%2 == 0){
                $("img").hide().eq(1).show();
            }else{
                $("img").hide().eq(0).show();
            }
            imgt++;
        }
    });

    function togglePosition(){
        if (i%2 == 0){
            t = 0;
            $("img").css({"top":"auto","bottom":"0"});
        }else{
            t = 1;
            $("img").css({"top":"0","bottom":"auto"});
        }
    }

    function text(){
        if($(".page.a").next().length == 0){
            $(".page.a").removeClass("a");
            $(".page").eq(0).addClass("a");
        }else{
            $(".page.a").removeClass("a").next().addClass("a");
        }
    }
});
