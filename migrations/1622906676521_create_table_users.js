module.exports = {
    "up": "CREATE TABLE `watch_party`.`users` ( `id` BIGINT(20) NOT NULL AUTO_INCREMENT ,  `name` VARCHAR(255) NOT NULL DEFAULT '' ,  `email` VARCHAR(255) NOT NULL DEFAULT ' ' ,  `password` VARCHAR(255) NOT NULL DEFAULT '' ,  `gender` VARCHAR(255) NOT NULL DEFAULT '' ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;",
    "down": "DROP TABLE users"
}