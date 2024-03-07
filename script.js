document.addEventListener("DOMContentLoaded", function() {
    var checkbox = document.getElementById("complete-checkbox");

    // Function to update checkbox state in GitHub issue
    function updateCheckboxState() {
        var token = "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"; // Ganti dengan token akses GitHub Anda
        var repoOwner = "hanifnurw"; // Ganti dengan nama pengguna Anda
        var repoName = "gachatime"; // Ganti dengan nama repositori Anda

        var issueTitle = "Checkbox Status";
        var issueBody = checkbox.checked ? "Checkbox is checked" : "Checkbox is unchecked";
        var apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: issueTitle,
                body: issueBody
            })
        })
        .then(response => {
            if (response.ok) {
                console.log("Checkbox state updated successfully.");
            } else {
                console.error("Failed to update checkbox state.");
            }
        })
        .catch(error => console.error("Error:", error));
    }

    // Load checkbox state from GitHub issue
    function loadCheckboxState() {
        var token = "YOUR_GITHUB_ACCESS_TOKEN"; // Ganti dengan token akses GitHub Anda
        var repoOwner = "YOUR_USERNAME"; // Ganti dengan nama pengguna Anda
        var repoName = "YOUR_REPOSITORY_NAME"; // Ganti dengan nama repositori Anda

        var apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;

        fetch(apiUrl, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(response => response.json())
        .then(issues => {
            // Cari isu dengan judul "Checkbox Status"
            var checkboxIssue = issues.find(issue => issue.title === "Checkbox Status");
            if (checkboxIssue) {
                // Jika isu ditemukan, perbarui status checkbox berdasarkan konten isu
                checkbox.checked = checkboxIssue.body.includes("Checkbox is checked");
            }

            // Reset checkbox at 07:00 GMT+7 every day
            var now = new Date();
            var gmt7Time = new Date(now.getTime() + (7 * 60 * 60 * 1000));
            if (gmt7Time.getUTCHours() === 0 && gmt7Time.getUTCMinutes() === 0 && gmt7Time.getUTCSeconds() === 0) {
                checkbox.checked = false;
                updateCheckboxState();
            }
        })
        .catch(error => console.error("Error:", error));
    }

    // Panggil fungsi untuk memuat status checkbox dari GitHub issue saat halaman dimuat
    loadCheckboxState();

    // Add event listener to checkbox to update its state in GitHub issue
    checkbox.addEventListener("change", updateCheckboxState);
});
