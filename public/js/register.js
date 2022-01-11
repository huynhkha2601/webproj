$('#frmRegister').on('submit', async function (e) {


    e.preventDefault();

    const captcha = $('#g-recaptcha-response').val();
    const username = $('#username').val();
    const password = $('#password').val();
    const email = $('#email').val();

    // if(username.length === 0 || password.length === 0 || $('#repeat').val().length === 0){
    //     alert("Please, fill out the registration form!");
    //     return;
    // }
    //
    // if(username.length < 6){
    //     alert("Username must be more than 6 character!");
    //     return;
    // }
    //
    // if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
    //     alert("Password must be more than 8 character and contains at least one uppercase, lowercase" +
    //         "and one number!!!");
    //     return;
    // }
    //
    // if(!(password === $('#repeat').val())){
    //     alert("Password and confirm password does not match!");
    //     return;
    // }

    // ajax check captcha api
    // await fetch(`/accounts/captcha/api?captcha=${captcha}`, {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         email,
    //         captcha
    //     })
    // })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         alert(data.msg);
    //         if (data.success === true)
    //             $("#frmRegister").off('submit').submit();
    //
    //     });

    // $.getJSON(`/accounts/is-available?username=${username}&email=${email}`,async function (data){
    //
    //     if(data.userVal === true && data.emailVal === true){
    //         alert("Username and Email are existed!");
    //         return;
    //     }
    //
    //     if(data.userVal === true){
    //         alert("This username is existed!");
    //         return;
    //     }
    //     if (data.emailVal === true){
    //         alert("This email is existed!");
    //         return;
    //     }
    //
    //
    //     if (data.userVal === false && data.emailVal === false) {
    //
    //
    //
    //         $("#frmRegister").off('submit').submit();
    //     }
    //
    // });


});


