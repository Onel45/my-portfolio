export const Cookies = {
  set(name, value, days) {
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) +
      '; expires=' + expires + '; path=/; SameSite=Lax' + secure;
  },
  get(name) {
    const match = document.cookie.split('; ').find((c) => c.startsWith(name + '='));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
  },
  remove(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax';
  },
};
