
var result =`/* 
 * 面试官你好，我是XXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

*{
transition: all 1s;
}
body{
background:rgb(222,222,222);
font-size: 16px;
}
#code{
    border: 1px solid red;
    padding: 16px;
}

/* 我需要一些代码高亮 */
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.function{
    color: #dd4a68;
}

/* 加点3D效果*/
#code{
    transform: rotate(360deg);
}

/* 我来介绍一下我自己吧 */
/* 我需要一张白纸 */
#code{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}
#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}
#paper > .content{
    background: white;
    height: 100%;
    width: 100%;
}
`

var result2 = `
    #paper{
        width: 100px;
        height: 100px;
        background: red;
    }
    `
var md = `
    sdasffffffffffff
    sssssssss
    sdfafdas
    sfdasf
`
writeCode('',result,()=>{
    createPaper(()=>{
        writeCode(result,result2,()=>{
            writeMarkdown(md)
        })
    })
})




function createPaper(){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('div')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
}
function fn3(preResult){
    
    var n = 0
    var id = setInterval(()=>{
        n += 1
        code.innerHTML = preResult + result.substring(0,n)
        code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css);
        styleTag.innerHTML = preResult + result.substring(0,n)+result.slice(0,n)

        if(n>=result.length){
            window.clearInterval(id)
        }
    },30)
}



/*将code写到#code和style标签中*/
function writeCode(prefix,code,fn){
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let id = setInterval(function(){
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css)
    styleTag.innerHTML = prefix + code.slice(0,n)
    domCode.scrollTop = domCode.scrollHeight
    if(n>=code.length){
    window.clearInterval(id)
    fn.call()
  }
},30)
}

function writeMarkdown(markdown,fn){
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(function(){
    n += 1
    domPaper.innerHTML = markdown.substring(0,n)
    domPaper.scrollTop = domPaper.scrollHeight
    if(n>=markdown.length){
    window.clearInterval(id)
    fn.call()
  }
},30)
}