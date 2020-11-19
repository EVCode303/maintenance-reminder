"use strict";
var dismiss = document.querySelector('#dismiss'), submit = document.querySelector('#submit'), overlay = document.querySelector('#overlay'), overlayBtn = document.querySelector('#btnFloat');
dismiss.addEventListener('click', function (e) {
    e.preventDefault();
    dismiss.style.display = 'none';
    overlay.style.display = 'none';
});
overlayBtn.addEventListener('click', function (e) {
    dismiss.style.display = 'block';
    overlay.style.display = 'block';
});
submit.addEventListener('click', function () {
    dismiss.style.display = 'none';
    overlay.style.display = 'none';
});
