lushPickItem(0);
mainItemLoad(12, 1, '.best_item_box .swiper-wrapper');
mainItemLoad(12, 3, '.limit_item_box .swiper-wrapper');
$(document).ready(function(){
    //탭 메뉴 누르면 하단 메뉴 아이템 변경하기
    $('.item_cate_tab li').eq(0).addClass('tab_click_active');
    $('.item_cate_tab li').click(function(){
        //탭 색 바꾸기
        $('.item_cate_tab li').removeClass('tab_click_active');
        $(this).addClass('tab_click_active');
        //메뉴변경
        $('.main_product_sec .section_body > div').addClass('box_none')
        $('.main_product_sec .section_body > div').eq($(this).index()).removeClass('box_none')
    })
    //스크롤이벤트들(이벤트 배너 슥 올라오기)
    let se_top = $('.season_event').offset().top;
    // let ab_top = $('.ad_banner').offset().top;
    function itemSlideUp(el){
        for(let i=0;i<el.length;i++){
            setTimeout(() => {
                el.eq(i).addClass('pos_init_active')
            }, 300*i);
        }
    }
    let toChk_arr = new Array($('.toChk').length);
    for(let i=0;i<toChk_arr.length;i++){
        toChk_arr[i]=false;
    }
    $(window).scroll(function(){
        let s_top = $(window).scrollTop();
        let s_bot = s_top + $(window).height();
        se_top = $('.season_event').offset().top;
        // console.log('스크롤 위치:', s_bot>=se_top?'섹션 밑':'섹션 위')
        if(!toChk_arr[0] && s_bot >= se_top){//스크롤이 이벤트 배너에 닿기
            itemSlideUp($('.season_event .pos_init'));
            toChk_arr[0] = true;
        }
        else if(toChk_arr[0] && s_bot < se_top) {//스크롤이 이벤트 배너보다 위로 올라가면 위치복구
            $('.season_event .pos_init').removeClass('pos_init_active');
            toChk_arr[0]=false;
        }
    })
    //비건 버튼 호버하면 색 채워지기
    $('.cover_btn').hover(function(){
        $('.cover_btn').css({
            background:'#a7ff6dc9'
        })
        $('.ad_img_box > img').addClass('ad_img_active')
    },function(){
        $('.cover_btn').css({
            background:'transparent'
        })
        $('.ad_img_box > img').removeClass('ad_img_active')
    })
})
