console.log(IEVersion());

if(IEVersion() == 6 || IEVersion() == 7 || IEVersion() == 8 ) { // 如果浏览器版本小于ie9
    var style = 'text-align:center;padding-top:200px;font-size:40px;'
    document.body.innerHTML = '<div style="'+style+'">浏览器版本不能小于小于ie9哦，否则不能正常访问该网站</div>';
}
if(IEVersion() == 9) {
    var divs = document.createElement('div');
    divs.style.lineHeight = '26px';
    divs.style.backgroundColor = 'pink';
    divs.style.paddingLeft = '20px';
    divs.innerHTML = '为了更友好访问该网站，建议您升级浏览器哦！或者使用谷歌浏览器访问！'
    var app = document.getElementById("app")
    app.insertBefore(divs,app.childNodes[0]);
}
// 判断IE浏览器版本
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }   
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11  
    }else{
        return -1;//不是ie浏览器
    }
}
  