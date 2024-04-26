import sqlite3

def create_connection(db_file):
    connection = sqlite3.connect(db_file)
    print("Database created and Successfully Connected to SQLite")
    return connection

def create_table(connection, create_table_sql):
    try:
        cursor = connection.cursor()
        cursor.execute(create_table_sql)
    except Exception as e:
        print(e)

def main():
    database = "classroom.db"
    sql_create_students_table = """CREATE TABLE IF NOT EXISTS students (
                                    id integer PRIMARY KEY,
                                    name text NOT NULL,
                                    attendance_status text,
                                    survey_completed boolean DEFAULT 0,
                                    survey_response text
                                  );"""
    sql_create_chats_table = """CREATE TABLE IF NOT EXISTS chats (
                                 id integer PRIMARY KEY,
                                 sender_id integer NOT NULL,
                                 sender_name text NOT NULL,
                                 message text,
                                 timestamp datetime DEFAULT CURRENT_TIMESTAMP,
                                 FOREIGN KEY (sender_id) REFERENCES students (id)
                               );"""
    sql_create_surveys_table = """CREATE TABLE IF NOT EXISTS surveys (
                                   id integer PRIMARY KEY,
                                   student_id integer NOT NULL,
                                   response text,
                                   FOREIGN KEY (student_id) REFERENCES students (id)
                                 );"""
    connection = create_connection(database)

    # create tables
    if connection is not None:
        create_table(connection, sql_create_students_table)
        create_table(connection, sql_create_chats_table)
        create_table(connection, sql_create_surveys_table)

        # populate students table
        students = [
            (1, 'John Appleseed', 'Absent', 0, ''),
            (2, 'Jane Appleseed', 'Absent', 0, ''),
            (3, 'Jim Appleseed', 'Absent', 0, ''),
            (4, 'George Appleseed', 'Absent', 0, ''),
            (5, 'Harry Appleseed', 'Absent', 0, ''),
            (6, 'Tim Appleseed', 'Absent', 0, ''),
            (7, 'Roger Appleseed', 'Absent', 0, ''),
            (8, 'Greg Appleseed', 'Absent', 0, ''),
            (9, 'Thomas Appleseed', 'Absent', 0, ''),
            (10, 'Craig Appleseed', 'Absent', 0, '')
        ]
        connection.executemany('INSERT INTO students (id, name, attendance_status, survey_completed, survey_response) VALUES (?, ?, ?, ?, ?)', students)
        connection.commit()
    else:
        print("Database connection creation failed.")

    connection.close()

main()

