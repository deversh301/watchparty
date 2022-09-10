module.exports = {
    "up": "CREATE TABLE `watch_party`.`group_codes` ( `id` BIGINT(10) NOT NULL , `user_id` BIGINT(10) NOT NULL , `group_code` INT(10) NOT NULL DEFAULT '0' , `url` VARCHAR(255) NOT NULL DEFAULT '' , `status` TINYINT(1) NOT NULL DEFAULT '0' , `is_expired` TINYINT(1) NOT NULL DEFAULT '0' , PRIMARY KEY (`id`)) ENGINE = InnoDB;",
    "down": ""
}