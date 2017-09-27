var results = ''
var results2 = ''
var finresults = ''
var last = ''
var flg = 1
var res1 = /＾[\*|\/].+/
var res2 = /.+[\*|\/]$/
var res3 = /(\+|\-|\*|\/)/
var show = e('.display')
var calculatorShow = function(){
  var num = es('.numberkey')
  bindEvents(num, 'click', function(event){
    var target = event.target
    log('target', target)
    //按键为 =
    if (target.innerHTML == '=') {
      return
    }
    //按键为 C 或 CE
    if (target.innerHTML == 'C' || target.innerHTML == 'CE' ) {
      results = ''
      show.innerHTML = '0'
      return
    }
    //
    if (target.classList.contains('show')) {
      return
    }
    //运算符号多输入
    if (last.match(res3) && target.innerHTML.match(res3)) {
      return
    }
    //下次如果点击 运算符 则继续运算
    //不是 运算符 则重新运算
    if (last == '=' && target.innerHTML.match(res3)) {
      results = finresults
    }

    //相反数功能
    if (target.innerHTML == '+/-' && results != '') {
      results = "-" + "("+results+")"
      show.innerHTML = results
      return
    }
    //点击到 Back键 删除上一个 键值
    if (target.innerHTML == '←' && results != '') {
      var res = results
      log('res', res);
      r = res.substr(0, res.length - 1)
      log('results', r)
      show.innerHTML = r
    }

    results += target.innerHTML
    last = target.innerHTML
    // log('results', results)
    show.innerHTML = results
  })
}

var calresults = function(){
  var equ = e('#equality')
  bindEvent(equ, 'click', function(){
    if (results.match(res1) || results.match(res2)) {
      show.innerHTML = '格式错误'
      results = ''
      return
    }
    finresults = eval(results)
    show.innerHTML = finresults
    last = "="
    results = ''
  })
}



var __main = function(){
  calculatorShow()
  calresults()
}

__main()
