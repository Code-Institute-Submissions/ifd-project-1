// The script starts when the website is loaded
$(document).ready(function () {

    // Hide numbers and number button until the game starts
    $('.first-col').hide();
    $('.second-col').hide();
    $(".buttons").hide();
    console.log('The interactive numbers and buttons are hidden.');

    // Mark selected difficulty level
    $('.dropdown-item').click(function () {
        $('.dropdown-item').removeClass('dropdown-item-checked');
        $(this).addClass('dropdown-item-checked');
        console.log('The difficulty has changed to ' + $(this).text());
    });
    
});