import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

def connect(user, password, db, host='localhost', port=3306):
    try:
        url = 'mysql+pymysql://{}:{}@{}:{}/{}'
        url = url.format(user, password, host, port, db)
        print("connecting to url: " + url)
        engine = sqlalchemy.create_engine(url)
        
        engine.connect()
        
        Session = sessionmaker(bind = engine)
        return engine, Session
    except Exception as e:
        print(e)
        raise e

engine, Session = connect('root', '041213jj',"test")
Base = declarative_base()