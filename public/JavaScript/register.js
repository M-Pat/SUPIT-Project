
$(document).ready(function() {
    $('#registrationForm').on('submit', function(event) {
        event.preventDefault(); 

        var username = $('#regUsername').val();
        var password = $('#regPassword').val();

        $.ajax({
            url: 'https://www.fulek.com/data/api/user/register', 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function(response) {
               
                alert('Registration successful');
                localStorage.setItem('loggedIn', true);
                $('#registrationModal').modal('hide');
                 $('#authButton').text('Log out').removeAttr('data-toggle data-target');
                $('#curriculumTab').show();
                console.log('Registration successful:', response);
                
            },
            error: function(xhr, status, error) {
               
                console.log('Registration failed:', error);
                
            }
        });
    });

    function openLoginPopup() {
        var registrationModal = $('#registrationModal');
        var loginModal = $('#loginModal');

        registrationModal.modal('hide');

        registrationModal.on('hidden.bs.modal', function () {
            loginModal.modal('show');
            registrationModal.off('hidden.bs.modal'); 
        });
    }

    $('.close-modal').on('click', function() {
        openLoginPopup();
    });

});
