// Тоггл формы стажировки
function toggleInternshipForm() {
    const form = document.getElementById("internship-form");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

// Тоггл формы консультации
function toggleConsultationForm() {
    const form = document.getElementById("consultation-form");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

// Форма добавления материалов
document.getElementById("add-material-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const description = document.getElementById("description").value;

    const container = document.querySelector(".library-container");
    const newItem = document.createElement("div");
    newItem.classList.add("library-item");
    newItem.innerHTML = `
        <h3>${title}</h3>
        <p>Автор: ${author}</p>
        <p>${description}</p>
        <a href="#" target="_blank">Скачать</a>
    `;
    container.appendChild(newItem);

    alert("Материал добавлен!");
    this.reset();
});
