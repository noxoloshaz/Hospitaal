const profileContent = document.querySelector('.profile-content');
const profileAction = document.querySelector('.profile-actions');

const menuOptions = document.querySelectorAll('.menu-option');

profileContent.addEventListener('click', function() {
    profileAction.classList.toggle('active');
})

menuOptions.forEach(function() {
    addEventListener('click', function() {
        console.log(this)

    })
})