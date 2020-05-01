CREATE TABLE "NOTE" (
    "ID" VARCHAR PRIMARY KEY,
    "USER_ID" VARCHAR NOT NULL,
    "TITLE" VARCHAR NOT NULL,
    "DESCRIPTION" VARCHAR
);

CREATE TABLE "REMINDER" (
    "ID" VARCHAR PRIMARY KEY,
    "NOTE_ID" VARCHAR NOT NULL,
    "TIME" VARCHAR NOT NULL,
    FOREIGN KEY ("NOTE_ID") REFERENCES NOTE("ID")
);
