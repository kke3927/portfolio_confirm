$(document).ready(function(){
    let initWinWidth = $(window).outerWidth();
    let fTop = $('.footer').offset().top;
    let fixedBottomOrder = `<div class="fixed_bottom_order">
    <div class="select_box volume_opt">
        <div class="selected_item">
            <div class="selected_value">용량을 선택해 주세요</div>
            <div class="arrow">
                <img src="../img/lush/lush_shopping_main/btn_quick_top.svg" alt="porfolio img">
            </div>
        </div>
        <ul class="option_ul">
            <li class="option_li">125g</li>
            <li class="option_li">315g</li>
        </ul>
    </div>
    <div class="order_box"></div>
    <div class="add_box_bot">
        <div class="item_total_qty">0개</div>
        <div class="item_total_price">₩ 0</div>
    </div>
    <div class="buy_btn_sec">
        <div class="add_to_bag">장바구니</div>
        <div class="buy_btn">바로구매</div>
    </div>
    </div>`
    function stickyBox(){
        let s_top = $(window).scrollTop();
        let s_bot = s_top + $(window).height();
        fTop = $('.footer').offset().top;
        if(s_bot >= fTop - 60 ) {
            $('.fixed_bottom_order').css({
                position:'absolute',
                bottom: 0
            })
        }
        else if(s_bot < fTop - 60) {
            $('.fixed_bottom_order').css({
                position:'fixed',
                bottom: 0
            })
        }
    }
    function ctrlQtyBySelect(tmp){
        let tmp_count = +($(`.opt_${tmp}`).find('.qty_input').val());
        tmp_count+=1;
        $(`.opt_${tmp}`).find('.qty_input').val(tmp_count);
    }
    function totalCalc(){
        let tmpVal =0;
        let tmpPrice=0;
        for(let i=0;i<$('.qty_input').length;i++){
            tmpVal += +($('.qty_input').eq(i).val());
            tmpPrice += +($('.qty_input').eq(i).val()) *ITEM_LIST[getUrlData('cateNo')][getUrlData('itemNo')].price;
        }
        $('.item_total_qty').text(tmpVal + '개')
        $('.item_total_price').text('₩'+comma(tmpPrice))
    }
    let topBnrHeight = $('.top_banner').height();
    let headerHeight = $('.header').height();
    $('.item_detail_nav').css({
        paddingTop:topBnrHeight+headerHeight
    });
    function makePadding(){
        let fixedBoxHeight = $('.fixed_bottom_order').innerHeight();
        $('.item_detail').css({
            paddingBottom:fixedBoxHeight
        })
    }
    makePadding();
    let trBox = `<tr class="select_volume">
    <td class="tag_box">용량</td>
    <td>
        <div class="select_box volume_opt">
            <div class="selected_item">
                <div class="selected_value">용량을 선택해 주세요</div>
                <div class="arrow">
                    <img src="../img/lush/lush_shopping_main/btn_quick_top.svg" alt="porfolio img">
                </div>
            </div>
            <ul class="option_ul">
                <li class="option_li">125g</li>
                <li class="option_li">315g</li>
            </ul>
        </div>
    </td>
    </tr>`;
    function resizeEl(){
        if(initWinWidth > 768) {//768보다 클때
            $('.fixed_bottom_order').remove();
            $('.select_volume').remove();
            $('.info_table tbody').append(trBox);
            $('.info_right .order_box').remove();
            $('.info_right .add_box_bot').before('<div class="order_box"></div>');
            $('.add_box_bot').eq(0).css({display:'flex'});
            $('.buy_btn_sec').eq(0).css({display:'flex'})
        }
        else if(initWinWidth <= 768) {
            $('.fixed_bottom_order').remove();
            $('.item_detail').append(fixedBottomOrder);
            $('.select_volume').remove();
            $('.info_right .order_box').remove();
            $('.add_box_bot').eq(0).css({display:'none'});
            $('.buy_btn_sec').eq(0).css({display:'none'})
        }
    }
    resizeEl();
    $(window).resize(function(){//resize시 동작하기
        initWinWidth = $(window).outerWidth();
        topBnrHeight = $('.top_banner').height();
        headerHeight = $('.header').height();
        fTop = $('.footer').offset().top;
        stickyBox();
        resizeEl();
        $('.item_detail_nav').css({
            paddingTop:topBnrHeight+headerHeight
        })
    })
    // 구매버튼 스크롤 픽스
    $(window).scroll(function(){
        stickyBox();
    })
    ////탭 이미지 호버하면 메인 이미지에 올라가기
    let infoLeftItem = `
    <div class="main_img_box">
                                    <img src="../img/lush/lush_shopping_product/${CATE_ARR[getUrlData('cateNo')]}/${ITEM_LIST[getUrlData('cateNo')][getUrlData('itemNo')].src1}" alt="main img">
                                </div>
                                <div class="img_tab_box">
                                    <ul class="ul_img_tab">
                                        <li>
                                            <img src="../img/lush/lush_shopping_product/${CATE_ARR[getUrlData('cateNo')]}/${ITEM_LIST[getUrlData('cateNo')][getUrlData('itemNo')].src1}" alt="test">
                                        </li>
                                        <li>
                                            <img src="../img/lush/lush_shopping_product/${CATE_ARR[getUrlData('cateNo')]}/${ITEM_LIST[getUrlData('cateNo')][getUrlData('itemNo')].src}" alt="test">
                                        </li>
                                        <li>
                                            <img src="../img/lush/lush_shopping_product/${CATE_ARR[getUrlData('cateNo')]}/${ITEM_LIST[getUrlData('cateNo')][getUrlData('itemNo')].src2}" alt="test">
                                        </li>
                                    </ul>
    `
    $('.info_left').append(infoLeftItem);
    $('.info_title').text(ITEM_LIST[getUrlData('cateNo')][getUrlData('itemNo')].title);
    $('.info_price').text('₩'+comma(ITEM_LIST[getUrlData('cateNo')][getUrlData('itemNo')].price));

    $('.ul_img_tab li').mouseover(function(){
        $('.main_img_box').children().attr('src', `${$(this).children().attr('src')}`)
    })



    ///////////셀렉트 기능////////////
    $(document).on('click', '.selected_item', function(){
        $(this).next().toggleClass('option_active')
    })
    $(document).on('click', '.option_li', function(){
        $(this).parents('.select_box').find('.selected_value').text( $(this).text())
        $(this).parent().toggleClass('option_active');//닫기
    })
    let tmpChk_Arr = new Array($('.volume_opt .option_li').length);
    for(let i=0;i<tmpChk_Arr.length;i++) {
        tmpChk_Arr[i] = $('.volume_opt .option_li').eq(i).text();
    }

    $(document).on('click', '.volume_opt .option_li', function(){
        let addedBox = `
    <div class="added_box opt_${$(this).text()}">
                                        <div class="add_box_top">
                                            <div class="added_item_vol">${$(this).text()}</div>
                                            <div class="qty_ctrl">
                                                <div class="minus_btn">-</div>
                                                <input type="text" value="1" class="qty_input">
                                                <div class="plus_btn">+</div>
                                            </div>
                                            <div class="ab_t_right">
                                                <div class="added_item_price">${$('.info_price').text()}</div>
                                                <div class="remove_add_box">
                                                    <img src="../img/lush/lush_shopping_main/closePop.svg" alt="닫기">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    `;
        if(!$('.added_box').hasClass(`opt_${$(this).text()}`)) {//중복 아니면 박스 추가
            $('.order_box').append(addedBox);
            let fixedBoxHeight = $('.fixed_bottom_order').height();
            $('.item_detail').css({paddingBottom: fixedBoxHeight})
        }
        else if($('.added_box').hasClass(`opt_${$(this).text()}`)) {//중복이면 수량 추가
            let tmpChk = $(this).text();
            for(let i=0;i<tmpChk_Arr.length;i++) {
                if(tmpChk == tmpChk_Arr[i]) {
                    ctrlQtyBySelect(tmpChk);
                }
            }
        }
        makePadding();
        totalCalc();
    })

    $(document).on('click','.plus_btn', function(){
        let tmpVal = +($(this).prev().val());
        tmpVal+=1;
        $(this).prev().val(tmpVal);//수량 변경. 이걸 아래 개수 표시에 넣기
        totalCalc();
        // $(this).parents('.order_box').next().find('.item_total_price').text('₩'+comma(tmpVal * 19000))
    })
    $(document).on('click','.minus_btn', function(){
        let tmpVal = +($(this).next().val());
        if(tmpVal <= 1) {
            alert('해당 제품의 최소 주문 수량은 1개입니다.')
        }
        else {
            tmpVal-=1;
            $(this).next().val(tmpVal);
            totalCalc();
            // $(this).parents('.order_box').next().find('.item_total_price').text('₩'+comma(tmpVal * 19000))
        }
    })
    //박스삭제
    $(document).on('click', '.remove_add_box', function(){
        $(this).parents('.added_box').remove();
        totalCalc();
        makePadding();
    })
    /////////////////////내비 스크롤
    $('.id_nav a').click(function(){
        event.preventDefault();
        let href = $(this).attr('href');
        let offsetTop = $(href).offset().top;
        $('html, body').animate({
            scrollTop: offsetTop
        },700)
    })
})