
document.getElementById("language-selector").addEventListener("change", function() {
    const lang = this.value;
    
    fetch(`/api/language/${lang}`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll("[data-key]").forEach(element => {
                const key = element.getAttribute("data-key");
                element.textContent = data[key];
            });
        })
        .catch(err => console.error("Language loading failed:", err));
});

