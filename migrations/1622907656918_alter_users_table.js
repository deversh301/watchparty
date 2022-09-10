module.exports = {
    "up": "ALTER TABLE `users` ADD `number` VARCHAR(255) NOT NULL DEFAULT '' AFTER `gender`;",
    "down": ""
}