class LocalStorage {
    get length() {
        return Object.keys(this).length;
    }

    getItem(key) {
        if (this.hasOwnProperty(key)) {
            return String(this[key]);
        }

        return null;
    }

    setItem(key, val) {
        this[key] = String(val);
    }

    removeItem(key) {
        delete this[key];
    }

    clear() {
        Object.keys(this).forEach((key) => {
            delete this[key];
        });
    }

    key(i = 0) {
        return Object.keys(this)[i];
    }
}

const fakeLocalStorage = new LocalStorage();

export default fakeLocalStorage;
