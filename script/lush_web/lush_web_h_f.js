$(document).ready(function(){
    let tbTxt=0;
    $('.tb_txt').eq(tbTxt%3).css({
        top:0
        })
    setInterval(function(){
        $('.tb_txt').eq(tbTxt%3).animate({
        top:0
        },0).animate({top: '-100%'}, 1000)
        $('.tb_txt').eq((tbTxt+1)%3).animate({
        top:'100%'
        },0).animate({
        top: 0
        },1000)
        tbTxt+=1
    },2000)
    //탑배너 없애기
    function makeWrapPadding(){
        let tbHeight = $('.top_banner').height();
        let hHeight = $('.header').height();
        $('#wrap').css({
            paddingTop: tbHeight+hHeight
        })
    }
    makeWrapPadding()
    $('.tb_close').click(function(){
        $(this).parent().remove()
        $('.header').css({top:0})
        makeWrapPadding()
    })

    //호버시
    let hoverItem=0;
    $('.gnb_item').hover(function(){
        hoverItem = $(this).index()
        $('.main_gnb_pan').stop(true).slideDown(500)
        $('.main_pan > li').eq(hoverItem).css({opacity:1,zIndex:99999})
    },function(){
        $('.main_gnb_pan').stop(true).slideUp(500)
        $('.main_pan > li').eq(hoverItem).css({opacity:0,zIndex:9})
    })
    $('.main_gnb_pan').hover(function(){
        $('.main_gnb_pan').stop(true).slideDown(500)
        $('.main_pan > li').eq(hoverItem).css({opacity:1,zIndex:99999})
    },function(){
        $('.main_gnb_pan').stop(true).slideUp(500)
        $('.main_pan > li').eq(hoverItem).css({opacity:0,zIndex:9})
    })
    //panaside 초기화
    $('.gnb_pan_aside').css({left:'-100%'})

    //햄버거 버튼 누르면 gnb_pan_aside 빼기
    $('.head_ham_btn').click(function(){
        $('.gnb_pan_aside').animate({left:'-100%', opacity: 0},0).animate({left:'0%', opacity: 1},0)
    })
    $('.aside_pan_close_btn').click(function(){
        $('.gnb_pan_aside').animate({left:'-100%', opacity: 0},0)
    })

    let subBoxHeight_arr = new Array($('.aside_sub_box').length);
    let subBoxOpenChk_arr = new Array(subBoxHeight_arr.length);
    function chkSubMenuHeight(){
        for(let i=0;i<subBoxHeight_arr.length;i++) {
            subBoxHeight_arr[i] = $('.aside_sub_box').eq(i).height();
        }
        console.log(subBoxHeight_arr)
    }
    chkSubMenuHeight();
    //반응형-일정 너비 이하, 로그인>아이콘으로 변경
    let windowWidth = $(window).innerWidth() + 17;
    let userUtil = $('.user_util').html();
    function pushInOut(){
        windowWidth = $(window).innerWidth() + 17;
        if(windowWidth < 335) {
            $('.user_util').children().remove();
            $('.user_util').append(`<img src="../img/lush/lush_shopping_main/account.svg" alt="icon">`)
        }
        else if(windowWidth >= 335) {
            $('.user_util').children().remove()
            $('.user_util').append(userUtil)
        }
    }
    pushInOut();
    $(window).resize(function(){
        makeWrapPadding();
        //resize 감지하면 무조건 aside판 display none 시키기
        $('.gnb_pan_aside').css({left:'-100%'})
        $('.aside_sub_box').css({height:0});
        pushInOut();
    })
    //aside 아코디언
    function closeAcordian(){
        for(let i=0;i<subBoxOpenChk_arr.length;i++) {
            subBoxOpenChk_arr[i] = false;
        }
    }
    closeAcordian();
    $('.aside_sub_box').css({height:0})

    $('.aside_sub_title').click(function(){
        if(!subBoxOpenChk_arr[$(this).data('subtitle')]) {
            $(this).css({pointerEvents:'none'});
            setTimeout(()=>{$(this).css({pointerEvents:'auto'})},300)
            $('.aside_sub_box').animate({height:0},300);
            closeAcordian();
            $(this).next().animate({
                height:subBoxHeight_arr[$(this).data('subtitle')]
            },300)// 열리기
            subBoxOpenChk_arr[$(this).data('subtitle')] = true;
        }
        else if(subBoxOpenChk_arr[$(this).data('subtitle')]){
            $(this).css({pointerEvents:'none'});
            setTimeout(()=>{$(this).css({pointerEvents:'auto'})},300)
            $(this).next().animate({
                height:0
            },300)
            subBoxOpenChk_arr[$(this).data('subtitle')] = false;
        }
    })
})
