$(document).ready(function () {
    // 注册模态框显示事件
    $("#registerModal").on("show.bs.modal", function () {
        // 清空验证码
        $("#registerVerificationCode").val("");
        // 还原生成验证码按钮文本
        $("#registerGenerateCode").text("生成验证码");
    });

    // 登录模态框显示事件
    $("#loginModal").on("show.bs.modal", function () {
        // 清空验证码
        $("#loginVerificationCode").val("");
        // 还原生成验证码按钮文本
        $("#loginGenerateCode").text("生成验证码");
    });

    // 生成验证码按钮点击事件
    $(".generate-code-btn").click(function () {
        var code = generateCode(6); // 生成 6 位的随机验证码
        $(this).text(code); // 将验证码显示在按钮上
    });

    // 注册按钮点击事件
    $("#Modal-register").click(function () {
        var username = $('#Modal-register').closest('.modal-content').find('#username').val().trim();  //获取用户名
        var password = $('#Modal-register').closest('.modal-content').find('#password').val().trim(); // 获取密码
        var confirmPassword = $("#confirmPassword").val().trim(); //获取确认密码
        var mobileInput = $("#mobileInput").val().trim();  //获取手机号
        var inputCode = $("#registerVerificationCode").val().trim(); // 获取用户输入的验证码

        if (username === "") {
            // 如果用户名未输入
            alert("请输入用户名");
            return;
        }

        if (password === "") {
            // 如果密码未输入
            alert("请输入密码");
            return;
        }
        if (confirmPassword === "") {
            // 如果确认密码未输入
            alert("请输入确认密码");
            return;
        }
        if (mobileInput === "") {
            // 如果手机号未输入
            alert("请输入手机号");
            return;
        }
        if (inputCode === "") {
            // 如果用户未输入验证码
            alert("请输入验证码");
            return;
        }

        //验证用户名
        const usernameRegex = /[A-Za-z0-9]{2,8}/;
        if (!usernameRegex.test(username)) {
            alert('用户名必须是2到8位之间的字母或数字！');
            return;
        }

        // 验证密码
        const passwordRegex = /[A-Za-z0-9]{6,30}/;
        if (!passwordRegex.test(password)) {
            alert('密码必须至少为6位，只能包含大小写字母或数字！');
            return;
        }

        // 验证确认密码
        if (password !== confirmPassword) {
            alert('两次输入的密码不一致！');
            return;
        }

        // 验证手机号
        const mobileRegex = /1[2-9]\d{9}$/;
        if (!mobileRegex.test(mobileInput)) {
            alert('手机号必须是11位的数字！第二位是2-9之间的数');
            return;
        }

        // 验证用户输入的验证码是否正确
        if (inputCode === "") {
            // 如果用户未输入验证码
            alert("请输入验证码");
            return;
        }

        var generatedCode = $("#registerGenerateCode").text().trim(); // 获取生成的验证码

        if (inputCode === generatedCode) {
            // 验证码正确
            // 在此处添加处理注册逻辑
            alert("注册成功！");
            $("#registerModal").modal("hide"); // 关闭注册模态框
        } else {
            // 验证码错误
            alert("验证码错误，请重新输入");
            // 清空输入框
            $("#registerVerificationCode").val("");
        }
    });

    // 登录按钮点击事件
    $("#Modal-login").click(function () {
        var username = $('#Modal-login').closest('.modal-content').find('#username').val().trim();  //获取用户名
        var password = $('#Modal-login').closest('.modal-content').find('#password').val().trim(); // 获取密码
        var inputCode = $("#loginVerificationCode").val().trim(); // 获取用户输入的验证码

        // 验证用户名、密码和验证码是否正确

        if (username === "") {
            // 如果用户名未输入
            alert("请输入用户名");
            return;
        }

        if (password === "") {
            // 如果密码未输入
            alert("请输入密码");
            return;
        }

        if (inputCode === "") {
            // 如果用户未输入验证码
            alert("请输入验证码");
            return;
        }
        //验证用户名
        const usernameRegex = /[A-Za-z0-9]{2,8}/;
        if (!usernameRegex.test(username)) {
            alert('用户名必须是2到8位之间的字母或数字！');
            return;
        }

        // 验证密码
        const passwordRegex = /[A-Za-z0-9]{6,30}/;
        if (!passwordRegex.test(password)) {
            alert('密码必须至少为6位，只能包含大小写字母或数字！');
            return;
        }
        var generatedCode = $("#loginGenerateCode").text().trim(); // 获取生成的验证码
        if (inputCode === generatedCode) {
            // 验证码正确
            // 在此处添加处理登录逻辑
            if (username === "lijun" && password === "1314520") {
                // 验证用户名和密码是否匹配
                alert("登录成功！");
                $("#loginModal").modal("hide"); // 关闭登录模态框
                window.location.href = 'https://blog.lijun920.xyz/';
            } else {
                alert("用户名或密码不正确");
            }
        } else {
            // 验证码错误
            alert("验证码错误，请重新输入");
            // 清空输入框
            $("#loginVerificationCode").val("");
        }

    });
});

// 生成指定长度的随机验证码
function generateCode(length) {
    var charset = "0123456789";
    var code = "";

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        code += charset.charAt(randomIndex);
    }

    return code;
}