class UserService {

    constructor(username, password) {
        this._username = username;
        this._password = password;
    }

    get username() {
        return this._username;
    }

    get password() {
        throw new Error("You are not allowed to get the password");
    }

    static async authenticate_user(username, password) {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        try {
            const API_URL = 'https://examples.com/api/user/authenticate';
            const response = await fetch(`${API_URL}?username=${username}&password=${password}`);

            if (response.ok) {
                return true;
            } else {
                throw new Error('Failed to authenticate user');
            }
            } catch (error) {
                throw new Error('Failed to send the request: ' + error.message);
        }
    }
}

async function handleLoginClick() {
    const username = $('#username').val();
    const password = $('#password').val();

    try {
        const res = await UserService.authenticate_user(username, password);
        if (res === true) {
            document.location.href = '/home';
        } else {
            alert('Failed to authenticate user');
        }
        } catch (error) {
        alert('Error: ' + error.message);
    }
}

$('form #login').click(handleLoginClick);
