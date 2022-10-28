export default function authHeader() {
    const Token = JSON.parse(localStorage.getItem('TOKEN'));
    if (Token && Token.token) {
      const OriginToken = "Bearer "+Token.token;
      const headers = {
        "Authorization": OriginToken
    };

      return headers;
    } else {
      return {};
    }
  }
  