jQuery.validator.addMethod("specialChars", function( value, element ) {
    var regex = new RegExp("^[a-zA-Z0-9_.-]+$");
    var key = value;

    if (!regex.test(key)) {
        return false;
    }
    return true;
}, "Використовуйте тільки літери латинського алфавіту, цифри, дефіс, крапку, нижнє підкреслювання.");


jQuery.validator.addMethod("passwordRule", function( value, element ) {
    var regex = new RegExp("[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))");
    var key = value;

    if (!regex.test(key)) {
        return false;
    }
    return true;
}, "Поле повинно містити як мінімум одну букву та цифру.");



jQuery.extend(jQuery.validator.messages, {
    required: "Це поле обов'язкове для заповнення.",
    remote: "Відповідні дані вже зареєстровані в системі.",
    email: "Будь ласка, введіть існуючу поштову скриньку.",
    maxlength: jQuery.validator.format("Максимальна кількість символів - {0}."),
    minlength: jQuery.validator.format("Мінімальна кількість символів - {0}."),
    equalTo: "Будь ласка, введіть те ж значення знову.",
});


$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip({
        delay:{
            show:1000,
            hide:100
        }
    });

    $('#registration-form').validate({
        rules: {
            username: {
                minlength: 3,
                maxlength: 24,
                specialChars: true,
                required: true,
                remote: {
                    url: "/users/check_login",
                    type: "post",
                    data: {
                        'username': function () { return $('#username').val();
                        }
                    }
                }
            },

            passwordtwo: {
                required: true,
                minlength: 6,
                maxlength: 32,
                specialChars: true,
                passwordRule: true
            },
            email: {
                required: true,
                email: true,
                remote: {
                    url: "/users/check_mail",
                    type: "post",
                    data: {
                        'email': function () { return $('#email').val();
                        }
                    }
                }
            },
            passwordthree: {
                required: true,
                equalTo: "#passwordtwo"
            },
            agree: {
                required: true
            }
        },
        highlight: function(element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
            element
                .text('OK!').addClass('valid')
                .closest('.control-group').removeClass('error').addClass('success');
        }
    });



    $('#login-form').validate({
        rules: {
            username: {
                minlength: 3,
                maxlength: 24,
                specialChars: true,
                required: true
            },

            password: {
                required: true,
                minlength: 6,
                maxlength: 32,
                specialChars: true,
                passwordRule: true
            }
        },
        highlight: function(element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
            element
                .text('OK!').addClass('valid')
                .closest('.control-group').removeClass('error').addClass('success');
        }
    });

});