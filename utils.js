const {Sequelize} = require('sequelize');

module.exports.paginateResults = ({
                                      after: cursor,
                                      pageSize = 20,
                                      results,
                                      getCursor = () => null,
                                  }) => {
    if (pageSize < 1) return [];

    if (!cursor) return results.slice(0, pageSize);
    const cursorIndex = results.findIndex(item => {
        let itemCursor = item.cursor ? item.cursor : getCursor(item);
        return itemCursor ? cursor === itemCursor : false;
    });

    return cursorIndex >= 0
        ? cursorIndex === results.length - 1
            ? []
            : results.slice(
                cursorIndex + 1,
                Math.min(results.length, cursorIndex + 1 + pageSize),
            )
        : results.slice(0, pageSize);
};

module.exports.createStore = () => {
    const db = new Sequelize({
        dialect: 'sqlite',
        storage: './store.sqlite'
    });

    const users = db.define('user', {
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        email: Sequelize.STRING,
        profileImage: Sequelize.STRING,
        token: Sequelize.STRING,
    });

    const trips = db.define('trip', {
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        launchId: Sequelize.INTEGER,
        userId: Sequelize.INTEGER,
    });

    return {db, users, trips};
};
