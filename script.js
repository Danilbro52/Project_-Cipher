document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("vigenere-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const text = document.getElementById("text").value;
        const key = document.getElementById("key").value;
        const action = document.getElementById("action").value;

        if (!/^[a-zA-Z]+$/.test(key)) {
            alert("Klucz powinien zawierać tylko litery.");
            return;
        }

        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "encrypt_decrypt.php", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const result = xhr.responseText;
                document.getElementById("result").innerHTML = `<h2>Wynik:</h2><p>${result}</p>`;
                document.getElementById("save-result").style.display = "block";
                addHistory(text, key, action, result);
            } else {
                document.getElementById("result").innerHTML = `<h2>Wynik:</h2><p>Wystąpił błąd!</p>`;
            }
        };
        xhr.send(formData);
    });

    function addHistory(text, key, action, result) {
        const historyList = document.getElementById("history-list");
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>Akcja:</strong> ${action} <br> <strong>Text:</strong> ${text} <br> <strong>Klucz:</strong> ${key} <br> <strong>Wynik:</strong> ${result}`;
        historyList.appendChild(listItem);
    }

    document.getElementById("save-result").addEventListener("click", function() {
        const resultText = document.querySelector("#result p").innerText;
        const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "vigenere_result.txt";
        link.click();
    });
});
