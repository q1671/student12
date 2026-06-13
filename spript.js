// 复制代码功能（通用）
function copyCode(elemId) {
    const codeText = document.getElementById(elemId).innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        alert("代码复制成功！");
    }).catch(err => {
        alert("复制失败，请手动复制");
    });
}

// 在线Python代码运行功能（和截图一致）
function runPythonCode() {
    const code = document.getElementById('codeInput').value;
    const outputArea = document.getElementById('outputArea');
    
    // 用Skulpt在浏览器运行Python代码
    Sk.pre = "outputArea";
    Sk.configure({
        output: function(text) {
            outputArea.textContent += text;
        },
        read: function(x) {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
            return Sk.builtinFiles["files"][x);
        }
    });
    
    outputArea.textContent = ""; // 清空之前的输出
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    var myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    });
    myPromise.then(function(mod) {
        console.log('success');
    }, function(err) {
        outputArea.textContent = err.toString();
    });
}