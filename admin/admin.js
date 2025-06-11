// Shared OIDC config
const oidcConfig = {
  authority: "https://cognito-idp.us-west-1.amazonaws.com/us-west-1_Xdr0hb8lP",
  client_id: "6b4naltb2dl8p86qj89ad1gahe",
  redirect_uri: window.location.origin + "/admin/dashboard.html",
  response_type: "code",
  scope: "openid email phone",
  post_logout_redirect_uri: window.location.origin + "/admin/login.html",
};

const userManager = new window.Oidc.UserManager(oidcConfig);

// Dashboard logic
if (document.getElementById("logout-btn")) {
  // Handle the callback and display tokens
  userManager
    .signinRedirectCallback()
    .then(function (user) {
      document.getElementById("email").textContent = user.profile?.email || "";
      document.getElementById("access-token").textContent =
        user.access_token || "";
      document.getElementById("id-token").textContent = user.id_token || "";
      document.getElementById("refresh-token").textContent =
        user.refresh_token || "";

      // Clean up the URL
      if (window.history.replaceState) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    })
    .catch(function () {
      // Not a callback, check if user is already logged in
      userManager.getUser().then(function (user) {
        if (!user || user.expired) {
          window.location.href = "login.html";
        } else {
          document.getElementById("email").textContent =
            user.profile?.email || "";
          document.getElementById("access-token").textContent =
            user.access_token || "";
          document.getElementById("id-token").textContent = user.id_token || "";
          document.getElementById("refresh-token").textContent =
            user.refresh_token || "";
        }
      });
    });

  // Logout button handler
  document.getElementById("logout-btn").onclick = function () {
    userManager.signoutRedirect();
  };
}


// ...existing code...

// Insert Link functionality for bio editor
const insertLinkBtn = document.getElementById("insert-link-btn");
if (insertLinkBtn) {
  insertLinkBtn.addEventListener("click", function () {
    const url = document.getElementById("link-url").value.trim();
    const aria = document.getElementById("link-aria").value.trim();
    const editor = document.getElementById("bio-editor");
    if (!url || !aria) {
      alert("Please enter both a URL and an aria-label.");
      return;
    }
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (!range || !range.toString()) {
      alert("Please select the text you want to turn into a link.");
      return;
    }
    // Create the link element
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("aria-label", aria);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
    a.className = "orange-link";
    a.textContent = range.toString();
    // Replace selected text with the link
    range.deleteContents();
    range.insertNode(a);
    // Move cursor after the link
    range.setStartAfter(a);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    // Clear inputs
    document.getElementById("link-url").value = "";
    document.getElementById("link-aria").value = "";
    editor.focus();
  });
}

// Save bio functionality
const saveBioBtn = document.getElementById("save-bio-btn");
if (saveBioBtn) {
  saveBioBtn.addEventListener("click", function () {
    userManager.getUser().then(function (user) {
      if (!user || user.expired) {
        document.getElementById("bio-save-result").textContent = "User not authenticated.";
        return;
      }
      const bioHtml = document.getElementById("bio-editor").innerHTML;
      fetch("https://w25u0cl832.execute-api.us-west-1.amazonaws.com/dev/bio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.access_token,
        },
        body: JSON.stringify({ bio: bioHtml }),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("bio-save-result").textContent = "Bio saved!";
        })
        .catch((error) => {
          document.getElementById("bio-save-result").textContent = "Error: " + error;
        });
    });
  });
}

// Optionally: Load current bio on page load
document.addEventListener("DOMContentLoaded", function () {
  const editor = document.getElementById("bio-editor");
  const preview = document.getElementById("bio-preview");
  if (editor && preview) {
    userManager.getUser().then(function (user) {
      if (!user || user.expired) return;
      fetch("https://w25u0cl832.execute-api.us-west-1.amazonaws.com/dev/bio", {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.bio) {
            editor.innerHTML = data.bio;
            preview.innerHTML = data.bio; // Update preview as well
          }
        });
    });
  }
});

const bioEditor = document.getElementById("bio-editor");
const bioPreview = document.getElementById("bio-preview");
if (bioEditor && bioPreview) {
  // Update preview on input
  bioEditor.addEventListener("input", function () {
    bioPreview.innerHTML = bioEditor.innerHTML;
  });

  // Also update preview when loading bio from API
  document.addEventListener("DOMContentLoaded", function () {
    bioPreview.innerHTML = bioEditor.innerHTML;
  });
}



const apiCallBtn = document.getElementById("api-call-btn");
if (apiCallBtn) {
  apiCallBtn.addEventListener("click", function () {
    userManager.getUser().then(function (user) {
      if (!user || user.expired) {
        document.getElementById("api-result").textContent =
          "User not authenticated.";
        return;
      }
      fetch("https://w25u0cl832.execute-api.us-west-1.amazonaws.com/dev/", {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("api-result").textContent = JSON.stringify(
            data,
            null,
            2
          );
        })
        .catch((error) => {
          document.getElementById("api-result").textContent = "Error: " + error;
        });
    });
  });
}
// ...existing code...

// Login logic
if (document.getElementById("signIn")) {
  document.getElementById("signIn").addEventListener("click", function () {
    userManager.signinRedirect();
  });
}
