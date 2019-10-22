import pytest
from sqlalchemy import Column, String, Integer, Date, MetaData, ForeignKey, desc, func
from orm import Base, engine, Session

#Minyoung Na Problem Set 1 Part 2
metadata = MetaData()

class Boats(Base):
    __tablename__ = 'boats'

    bid = Column(Integer, primary_key=True)
    bname = Column(String)
    color = Column(String)
    length = Column(Integer)

class Sailors(Base):
    __tablename__ = 'sailors'

    sid = Column(Integer, primary_key=True)
    sname = Column(String)
    rating = Column(Integer)
    age = Column(Integer)

class Reserves(Base):
    __tablename__ = 'reserves'

    sid = Column(Integer, ForeignKey('sailors.sid'), primary_key=True)
    bid = Column(Integer, ForeignKey('boats.bid'), primary_key=True)
    day = Column(Date, primary_key=True)

#Checking if the answers are correct
def checker(sql_query, orm_query):

    sql = []
    orm = []
    with engine.connect() as conn:
        result = conn.execute(sql_query)
        for x in result:
            sql.append(x)
    for x in orm_query:
        orm.append(x)
    print("ORM query:")
    print(orm)
    print("SQL query:")
    print(sql)

    assert sql == orm

session = Session()

def tester():
        
    #List, for every boat, the number of times it has been reserved, 
    #excluding those boats that have never been reserved (list the id and the name).
   
    orm_2 = session.query(Boats.bid,Boats.bname,func.count('reserves.sid')).filter(Boats.bid == Reserves.bid)
    sql_2 = "SELECT b.bid, b.bname, count(r.sid) as TRserved FROM boats b JOIN reserves r ON b.bid = r.bid ;"
    checker(sql_2, orm_2)
    
    #Find the average age of sailors with a rating of 10.

    orm_7 = session.query(func.avg(Sailors.age)).filter(Sailors.rating == 10).all()
    sql_7 = "SELECT avg(s.age) from sailors s where s.rating = 10;"
    checker (sql_7,orm_7)

if  __name__ == "__main__":
    tester()
    session.commit()
    session.close()