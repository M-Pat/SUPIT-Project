$(document).ready(function() {

    if (localStorage.getItem('loggedIn')) {
        console.log("Logged in");
        $('#authButton').text('Log out').removeAttr('data-toggle data-target');
        $('#curriculumTab').show();
    } else {
        $('#authButton').text('Login/Register').attr('data-toggle', 'modal').attr('data-target', '#loginModal');
        $('#curriculumTab').hide();
    }


    $('#authButton').on('click', function() {
        console.log("Button changed");
        if (localStorage.getItem('loggedIn')) {
            localStorage.removeItem('loggedIn');
            $('#authButton').text('Login/Register').attr('data-toggle', 'modal').attr('data-target', '#loginModal');
            $('#curriculumTab').hide();
        }
    });
});
