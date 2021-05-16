let signUpBtn = document.querySelector('.sign_up');
let input = document.querySelectorAll('form input');
signUpBtn.onclick = function() {
    getAjax(
        'POST',
        'http://vtmer.cn/signUp',
        {
            userName:input[0].value,
            userPhone:input[1].value,
            userPassword:input[2].value,
            code:input[3].value
        },3000,
        function(xhr) {
            // balabala
        },function(xhr) {
            console.log(xhr);
        }
    )
}