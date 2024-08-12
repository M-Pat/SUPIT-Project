$(document).ready(function() {
    $('#loginForm').on('submit', function(event) {
      event.preventDefault();

      var username = $('#loginUsername').val();
      var password = $('#loginPassword').val();

      $(document).ready(function() {
        $('#loginForm').on('submit', function(event) {
            event.preventDefault();
    
            var username = $('#loginUsername').val();
            var password = $('#loginPassword').val();
    
            $.ajax({
                url: 'https://www.fulek.com/data/api/user/login',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username: username, password: password }),
                success: (response) => {

                    if (response.data) {

                        console.log(response.data);

                        localStorage.setItem('loggedIn', true);
                        localStorage.setItem('userData', JSON.stringify(response.data));

                        $('#loginModal').modal('hide');
                        $('#authButton').text('Log out').removeAttr('data-toggle data-target');
                        $('#curriculumTab').show();
                        
                        alert("Login success");
                    } else {
                        console.error('response.data is null or undefined');
                        alert('Login failed');
                    }
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    console.log(jqXHR);
                    alert('Login failed: ' + jqXHR.status + ' ' + errorThrown);
                }
            });
        });
     });
   });
      
   function openRegistrationPopup() {
    var loginModal = $('#loginModal');
    var registrationModal = $('#registrationModal');
    
    loginModal.modal('hide');
    
    loginModal.on('hidden.bs.modal', function () {
        registrationModal.modal('show');
        loginModal.off('hidden.bs.modal'); 
    });
  }

  $('.close-modal').on('click', function() {
      openRegistrationPopup();
  });

  });
