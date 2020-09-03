(function ($) {
    "use strict";


    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "type the correct answer -_-");

    // validate contactForm form
    $(function () {
        $('#contactForm').validate({
            rules: {
                fullname: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                companyname: {
                    required: true,
                    minlength: 2
                },
                message: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                fullname: {
                    required: "This value is required.",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This value is required."
                },
                companyname: {
                    required: "This value is required.",
                    minlength: "your name must consist of at least 2 characters"
                },
                message: {
                    required: "um...yea, you have to write something to send this form.",
                    minlength: "thats all? really?"
                }
            },
            submitHandler: function (form) {
                // console.log('success');
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "contact_process.php",
                    beforeSend: function() {
                        $(form).find('#submit-contact').attr('disabled', 'true');
                    },
                    success: function (data) {
                        $('#message-contact').html("Thanks for contacting Q-Modeler, We will contact with you soon").fadeIn();
                        $('#submit-contact').css('background-color','#eeeeee').css('color', '#aaa').css('border-color', '#fff');
                        // $('#contactForm :input').attr('disabled', 'disabled');
                        // $('#contactForm').fadeTo("slow", 0.15, function () {
                        //     $(this).find(':input').attr('disabled', 'disabled');
                        //     $(this).find('label').css('cursor', 'default');
                        // })
            
                    },
                    error: function (err) {
                         console.log(err);
                        // $('#contactForm').fadeTo("slow", 0.15, function () {
                        //     $('#error').fadeIn()
                        // })
                        $('#message-contact').html("Error").fadeIn();
                        $(form).find('#submit-contact').removeAttr("disabled");
                    }
                })
                //$(form).find(button).attr('disabled', 'disabled');
            }
        })
    })

})(jQuery)