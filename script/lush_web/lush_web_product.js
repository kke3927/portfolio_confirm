getUrlData('cateNo');
let prodBgArray = ['lush-easter.webp', 'default_hover_banner.jpg', 'Bath-big-blue-bath-bomb-desktop_f3f6acdc.jpg', 'afro_hair_cair_range_PR_image_2020-1-scaled-1.jpg'];
$(document).ready(function(){
    $('.product_banner').css({
        background: `url(../img/lush/lush_shopping_product/${prodBgArray[getUrlData('cateNo')]}) no-repeat center / cover`})
    //cateNo에 따라 product_txt_box h2와 p 에 들어가는 문구 바꾸기
    $('.product_txt_box h2').text(PAGENAME_ARR[getUrlData('cateNo')]);
    $('.product_txt_box p').text(PAGEDESC_ARR[getUrlData('cateNo')]);
    loadProductItem(6,'.banner_box');
    
    // .box들 기본 자리 세팅
    let box_count = $('.box').length;
    let box_w = $('.box').outerWidth();
    for(let i=0; i<box_count; i++) {
        $('.box').eq(i).css({left: box_w * i})
    }
    // 한칸의 사이즈를 구해서 위치 재배열
    $(window).resize(function(){
        box_w = $('.box').outerWidth();
        for(let i=0; i<box_count; i++) {
            $('.box').eq((i+boxIdx)%box_count).css({left: box_w * i})
        }
    });
    let boxIdx = 0;
    $('.btn_R').click(function(){
        $('.box').animate({
            left: `-=${box_w}`
        }, 500, 'linear')
        $('.box').eq(boxIdx % box_count).animate({
            left: box_w * (box_count - 1)
        }, 0, 'linear')
        boxIdx+=1;
    })
    $('.btn_L').click(function(){
        $('.box').eq((boxIdx - 1) % box_count).animate({
            left: -box_w
        }, 0, 'linear')
        $('.box').animate({
            left: `+=${box_w}`
        }, 500, 'linear')
        boxIdx-=1;
    })
    
    $('.note_item_qty').text(`전체(${ITEM_LIST[getUrlData('cateNo')].length})`);
    
    $('.sec_header').prepend(`<span>총 ${ITEM_LIST[getUrlData('cateNo')].length} 개 제품</span>`);
    
    
    
    //무한스크롤
    let f_o_top = $('.footer').offset().top;
    let pl_top = $('.scroll_load_sec .sec_body').offset().top;
    
    function itemScrollUp(el ,qty){
        let currActCount = $('.toChk').length - qty;
        let lastActNo = currActCount + el.length;
        if(lastActNo > ITEM_LIST[getUrlData('cateNo')].length) {
            lastActNo = ITEM_LIST[getUrlData('cateNo')].length;
        }
        for(let i=currActCount;i<lastActNo;i++){
            setTimeout(() => {
                el.eq(i).addClass('pos_init_active')
            }, 75*i);
            console.log('currActCount, lastActNo:', currActCount, lastActNo)
        }
    }
    let qtyBox=8;
    if($(window).width()>720) {
        qtyBox=8
    }
    else if($(window).width()<=720) {
        qtyBox=6;
    }
    if($(window).width()>720) {
        loadScrollItem(qtyBox);
    }
    else if($(window).width()<=720) {
        loadScrollItem(qtyBox);
    }
    $(window).scroll(function(){
        let s_top = $(window).scrollTop();
        let s_bot = s_top + $(window).height();
        f_o_top = $('.footer').offset().top;
        
        if(s_bot >= pl_top){//스크롤이 해당 섹션에 닿으면 기존 거 샤샥
            itemScrollUp($('.toChk'),qtyBox);
        }
    
        if(s_bot - 200 >= f_o_top) {//스크롤이 푸터에 닿을 때쯤 아이템 불러오면서 샤샥
            loadScrollItem(qtyBox);
            itemScrollUp($('.toChk'),qtyBox);
        }
    })
})