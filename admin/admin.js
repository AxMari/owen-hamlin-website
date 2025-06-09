// Shared OIDC config
const oidcConfig = {
    authority: "https://cognito-idp.us-west-1.amazonaws.com/us-west-1_Xdr0hb8lP",
    client_id: "6b4naltb2dl8p86qj89ad1gahe",
    redirect_uri: window.location.origin + "/admin/dashboard.html",
    response_type: "code",
    scope: "openid email phone",
    post_logout_redirect_uri: window.location.origin + "/admin/login.html"
};

const userManager = new window.Oidc.UserManager(oidcConfig);

// Dashboard logic
if (document.getElementById("logout-btn")) {
    // Handle the callback and display tokens
    userManager.signinRedirectCallback().then(function (user) {
        document.getElementById("email").textContent = user.profile?.email || "";
        document.getElementById("access-token").textContent = user.access_token || "";
        document.getElementById("id-token").textContent = user.id_token || "";
        document.getElementById("refresh-token").textContent = user.refresh_token || "";

        // Clean up the URL
        if (window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }).catch(function () {
        // Not a callback, check if user is already logged in
        userManager.getUser().then(function (user) {
            if (!user || user.expired) {
                window.location.href = "login.html";
            } else {
                document.getElementById("email").textContent = user.profile?.email || "";
                document.getElementById("access-token").textContent = user.access_token || "";
                document.getElementById("id-token").textContent = user.id_token || "";
                document.getElementById("refresh-token").textContent = user.refresh_token || "";
            }
        });
    });

    // Logout button handler
    document.getElementById('logout-btn').onclick = function () {
        userManager.signoutRedirect();
    };
}

// Login logic
if (document.getElementById("signIn")) {
    document.getElementById("signIn").addEventListener("click", function () {
        userManager.signinRedirect();
    });
}