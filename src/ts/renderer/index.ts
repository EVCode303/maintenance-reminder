var dismiss: any = document.querySelector('#dismiss'),
    submit: any = document.querySelector('#submit'),
    overlay: any = document.querySelector('#overlay'),
    overlayBtn: any = document.querySelector('#btnFloat');

dismiss.addEventListener('click', (e): any => {
    e.preventDefault();
    dismiss.style.display = 'none';
    overlay.style.display = 'none';
});

overlayBtn.addEventListener('click', (e): any => {
    dismiss.style.display = 'block';
    overlay.style.display = 'block';
});

submit.addEventListener('click', (): any => {
    dismiss.style.display = 'none';
    overlay.style.display = 'none';
});