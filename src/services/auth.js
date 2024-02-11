import Client from './api'

export const SignInUser = async (data) => {
    try {
        const res = await Client.post('/auth/login', data)
        localStorage.setItem('token', res.data.token)
        return res.data.user
    } catch (error) {
        console.error('Error in SignInUser:', error);
        throw error
    }
}

export const RegisterUser = async (data) => {
    try {
        const res = await Client.post('/auth/register', data)
        return res.data
    } catch (error) {
        console.error('Error in RegisterUser:', error.message);
        throw error
    }
}

export const CheckSession = async () => {
    try {
        const res = await Client.get('/auth/session')
        return res.data
    } catch (error) {
        console.error('Error in CheckSession:', error.message);
        throw error
    }
}
