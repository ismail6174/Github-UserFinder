  async function getUser() {
      const username = document.getElementById("username").value.trim();
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "<p>Loading...</p>";

      if (!username) {
        resultDiv.innerHTML = "<p style='color:orange;'>Please enter a username.</p>";
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();

        resultDiv.innerHTML = `
          <div class="card">
            <img src="${data.avatar_url}" alt="${data.login}" />
            <h2>${data.name || "No name found"}</h2>
            <p>@${data.login}</p>
            <p>${data.bio || "No bio available"}</p>
            <p>Followers: ${data.followers} | Following: ${data.following}</p>
            <p>Public Repos: ${data.public_repos}</p>
            <a href="${data.html_url}" target="_blank">Visit GitHub Profile</a>
          </div>
        `;
      } catch (error) {
        resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
      }
    }