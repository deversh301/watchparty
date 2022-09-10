module.exports = {
    "up": "CREATE TABLE `watch_party`.`grouped_users` ( `id` BIGINT(10) NOT NULL , `user_id` BIGINT(10) NOT NULL , `group_code` INT(10) NOT NULL , `created_user_id` BIGINT(10) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;",
    "down": ""
}