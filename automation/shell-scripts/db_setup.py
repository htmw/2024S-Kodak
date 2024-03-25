import mysql.connector
from yaml import safe_load
from os import path


def connect(user, password, host, database):
    try:
        conn = mysql.connector.connect(user = user, password = password, host = host, database = database)
        print("Connected")
        return conn
    except Exception as e:
        print("connection refused " + str(e))

def commit(conn):
    try:
        # with self.lock:
        conn.commit()
        # log.debug("Committing changes to DB, table : " + self.fw_db_table_name )
    except Exception as e:
        print("Commit Error : " + str(e))

def execute(query):
    try:
        # with self.lock:
        cursor = conn.cursor(buffered=True)
        cursor.execute(query)
        return cursor
          
    except mysql.connector.ProgrammingError as e:
        print(e)
    except Exception as e:
        print(e)

def init_table(conn):
    query = '''CREATE TABLE IF NOT EXISTS user_data (username VARCHAR(50), password VARCHAR(100), name VARCHAR(150), email VARCHAR(100), contact_number VARCHAR(15), resume LONGTEXT); '''
    execute(query)
    commit(conn)
    print("Table Created")

def close(conn):
    try:
        # with self.lock:
        conn.close()
        print("Connection Closed")
    except Exception as e:
        print(e)


if __name__ == '__main__':
    config_file = None
    if config_file is None:
        config_file = path.dirname(path.dirname(path.abspath(__file__))) + '/CS691/resume_parser/config.yml'.replace('/', path.sep)
    with open(config_file) as general_config:
        config = safe_load(general_config)
    db_config = config["database"]
    conn = connect(db_config["username"], db_config["password"], db_config["host"], db_config["db_name"])
    init_table(conn)
    close(conn)
