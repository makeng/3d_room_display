/**
 * Created by Administrator on 2017/6/1.
 */
/*--------------------------------------- define ---------------------------------------------*/
/*  添加可点击文字
 * */
function addClickText($view, name, position, rotation, src) {
    var yUpAndDownDistance = 0.1;   //上下浮动动画距离
    //
    var positionStr = position[0] + ' ' + (position[1] - yUpAndDownDistance) + ' ' + position[2];
    var animatePositionStr = position[0] + ' ' + (position[1] + yUpAndDownDistance) + ' ' + position[2];
    var rotationStr = rotation[0] + ' ' + rotation[1] + ' ' + rotation[2];
    var str = '<a-entity position="' + positionStr +
        '" geometry="primitive: plane; width: 1; height: .3" material="color: #555" src=' + src +
        ' rotation="' + rotationStr +
        '" text="color: yellow; align: center; value: go to ' + name +
        '; width: 4; " class="go-text">' +
        '<a-animation attribute="position" to="' + animatePositionStr +
        '" repeat="indefinite" dur="500" direction="alternate"></a-animation>' +
        '</a-entity>';
    //
    $view.append(str);
    $('.go-text').on('click', goToRoom);
    console.log( $('.go-text').attr('src') );

    /*  跳转到指定房间
     * */
    function goToRoom() {
        var src = $(this).attr('src');
        loadBackground(src)
    }
}

/*  载入初始场景
 * */
function loadBackground(src) {
    $('#vr-background').attr({src: src});
}

/*--------------------------------------- process ---------------------------------------------*/
$(function () {
    var roomObj;
    $.getJSON('./js./room.json', function (res) {
        roomObj = res;
        loadBackground(roomObj.src);
        $.each(roomObj.subRoom, function (index, item) {
            addClickText($('.dir-content'), item.name, item.position, item.rotation, item.src);
        });
    });
});