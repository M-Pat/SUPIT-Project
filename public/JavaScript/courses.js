
$(document).ready(function() {
    
    function getToken() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log("User token and data" + userData);
        return userData ? userData.token : null;
    }

    function loadCourseDetails(course) {
        $('#courseId').text(course.id);
        $('#courseName').text(course.course);
        $('#courseEcts').text(course.ects);
        $('#courseHours').text(course.hours);
        $('#courseLectures').text(course.lectures);
        $('#courseExercises').text(course.exercises);
        $('#courseType').text(course.type);
        $('#courseSemester').text(course.semester);
        $('#courseDetails').show();
    }

    function addCourseToTable(course) {
        const row = `<tr data-id="${course.id}">
            <td>${course.id}</td>
            <td>${course.course}</td>
            <td>${course.ects}</td>
            <td>${course.hours}</td>
            <td>${course.lectures}</td>
            <td>${course.exercises}</td>
            <td>${course.type}</td>
            <td>${course.semester}</td>
            <td><button class="removeCourseButton">Remove</button></td>
        </tr>`;
        $('#selectedCoursesTable tbody').append(row);
        updateTotals();
    }

    function updateTotals() {
        let totalEcts = 0, totalHours = 0;
        $('#selectedCoursesTable tbody tr').each(function() {
            totalEcts += parseFloat($(this).find('td').eq(2).text());
            totalHours += parseFloat($(this).find('td').eq(3).text());
        });
        $('#totalEcts').text(totalEcts);
        $('#totalHours').text(totalHours);
    }

    $('#courseSearch').autocomplete({
        source: function(request, response) {

            const token = getToken();
            let searchTerm = $(this.element).val(); 

            if (searchTerm && typeof searchTerm === 'string') {
                searchTerm = searchTerm.toLowerCase();

             if (token) {
                $.ajax({

                    url: 'https://www.fulek.com/data/api/supit/curriculum-list/en',
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },

                    success: function(data) {
                        console.log(data);
                        const filteredCourses = data.data.filter(course => course.course.toLowerCase().includes(searchTerm));
                        response(filteredCourses.map(course => ({
                            label: course.course,
                            value: course.course,
                            courseData: course
                        })));
                    },

                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error('Error loading courses:', jqXHR, textStatus, errorThrown);
                        alert('Error loading courses');
                    }
                });
             } else {
                console.log('No token found, user is not logged in.');
             }
           };
        },
        select: function(event, ui) {
            event.preventDefault();
            loadCourseDetails(ui.item.courseData);
        }
    });

    $('#addCourseButton').on('click', function() {
        const course = {
            id: $('#courseId').text(),
            course: $('#courseName').text(),
            ects: $('#courseEcts').text(),
            hours: $('#courseHours').text(),
            lectures: $('#courseLectures').text(),
            exercises: $('#courseExercises').text(),
            type: $('#courseType').text(),
            semester: $('#courseSemester').text()
        };
        addCourseToTable(course);
        $('#courseDetails').hide();
    });

    $('#selectedCoursesTable').on('click', '.removeCourseButton', function() {
        $(this).closest('tr').remove();
        updateTotals();
    });
});
