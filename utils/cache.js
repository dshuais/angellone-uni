const TOKENKEY = 'angellone-token'

export const setStoreage = (key, value) => {
	if(!uni.setStorageSync) return
	if(key != null && value != null) {
		uni.setStorageSync(key, value)
	}
}

export const getStoreage = key => {
	if(!uni.setStorageSync) return null
	if(key != null) {
		return uni.getStorageSync(key)
	}
}

export const remove = key => {
	uni.removeStorageSync(key)
}

export const setToken = token => {
	setStoreage(TOKENKEY, token)
}

export const getToken = _ => {
	return getStoreage(TOKENKEY)
}

export const removeToken = _ => {
	remove(TOKENKEY)
}
