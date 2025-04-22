document.getElementById('image').addEventListener('change', function (event) {
    const fileInput = event.target;
    const fileName = fileInput.files[0] ? fileInput.files[0].name : 'No file chosen';
    document.querySelector('.file-name').innerHTML = fileName;

});