CREATE TABLE `fsd14_project`.`favorites` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `region` VARCHAR(45),
  `country` VARCHAR(45) NOT NULL,
  `visited` TINYINT NOT NULL,
  `label` VARCHAR(45) NULL,
  `ranking` INT NOT NULL,
  PRIMARY KEY (`id`));
  

INSERT INTO FAVORITES (NAME, REGION, COUNTRY, VISITED, LABEL, RANKING)
VALUES ("Montreal", "Quebec", "Canada", TRUE, "Home", 1),
("Vancouver", "Bristish Columbia", "Canada", FALSE, "None", 3),
("Calgary", "Alberta", "Canada", TRUE, "None", 2),
("Paris", "Ile-de-France", "France", TRUE, "None", 6),
("Singapore", "", "Singapore", TRUE, "Vacation", 5),
("Cardiff", "Cardiff", "United Kingdom", TRUE, "University", 4),
("Toronto", "Onatrio", "Canada", TRUE, "Home", 7),
("Ottawa", "Onatrio", "Canada", TRUE, "None", 8);


SELECT ID, NAME, REGION, COUNTRY, VISITED, LABEL, RANKING FROM FAVORITES;

INSERT INTO FAVORITES (NAME, REGION, COUNTRY, VISITED, LABEL, RANKING)
VALUES ("Dubai", "Dubai", "United Arab Emirates", TRUE, "Vacation", 9);

DELETE FROM FAVORITES WHERE NAME=Paris;
DELETE FROM FAVORITES WHERE ID=8;