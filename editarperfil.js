for (let i = 1; i <= 9; i++) {
    const input = document.getElementById(`foto${i}`);
    input.addEventListener("change", function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                let preview = document.getElementById(`preview${i}`);
                if (!preview) {
                    preview = document.createElement("img");
                    preview.id = `preview${i}`;
                    preview.style.width = "100px";
                    preview.style.borderRadius = "10px";
                    preview.style.marginTop = "8px";
                    input.parentNode.appendChild(preview);
                }
                preview.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
}