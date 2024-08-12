
/*CONTACT FORM*/

$(document).ready(function() {
  $('#contactForm').on('submit',function(e){
    e.preventDefault();

    var formData = {
        FullName: $('#fullName').val(),
        Email: $('#email').val(),
        Importance: $('#importance').val(),
        ReceiveNewsletter: $('#receiveNewsletter').is(':checked'),
        Message: $('#message').val()
    };

      console.log("start func");

    $.ajax({
        type: 'POST',
        url: 'https://www.fulek.com/mvc/supit/project-contact-form',
        data: formData,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        success: 
        function(response) {
            alert('Form submitted successfully!');
        },
        error: function(xhr, status, error) {
            alert('An error occurred: ' + error);
        }
    });
  }); 
});