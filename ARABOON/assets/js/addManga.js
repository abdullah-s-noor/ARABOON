const submitButton = document.getElementById('submit-btn');
const mangaInput = document.getElementById('manga-name-new');
const chapterInput = document.getElementById('chapter-new');
function updateSubmitButtonState() {
    if (mangaInput.value&& chapterInput.value) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}
mangaInput.addEventListener('input', updateSubmitButtonState);
chapterInput.addEventListener('input', updateSubmitButtonState);
submitButton.addEventListener('click', function () {
    const selectedManga = mangaInput.value.trim();
    const selectedChapter = chapterInput.value.trim();
    console.log(`Selected Manga: ${selectedManga}`);
    console.log(`Selected Chapter: ${selectedChapter}`);
});
document.getElementById('chapter-file').addEventListener('change', function(e) {
    const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
    e.target.nextElementSibling.nextElementSibling.textContent = fileName;
});