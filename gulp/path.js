/**
 * Static methods that returns project paths.
 */
class Path {
    static bundle(path = '') {
        return './bundle'.concat(path);
    }
    static nodeModules(path = '') {
        return './node_modules'.concat(path);
    }
}

module.exports = Path;
