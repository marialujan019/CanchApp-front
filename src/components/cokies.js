function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      const trimmedName = cookieName.trim();
      if (trimmedName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  module.exports = {
    getCookie: getCookie
  }