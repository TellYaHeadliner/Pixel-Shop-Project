import api from "~/api"

const userService = {
    getProfile: api.get('/user/profile'),
    updateProfile: api.put('/user/profile'),
    updatePassword: api.put('/user/password'),
    updateEmail: api.put('/user/email')
}

export default userService;