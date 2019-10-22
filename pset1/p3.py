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
    cost = Column(Integer)
    cond = Column(String)
    length = Column(Integer)

class Sailors(Base):
    __tablename__ = 'sailors'

    sid = Column(Integer, primary_key=True)
    sname = Column(String)
    rating = Column(Integer)
    pay = Column(Integer)
    hour = Column(Integer)
    age = Column(Integer)

class Reserves(Base):
    __tablename__ = 'reserves'

    sid = Column(Integer, ForeignKey('sailors.sid'), primary_key=True)
    bid = Column(Integer, ForeignKey('boats.bid'), primary_key=True)
    day = Column(Date, primary_key=True)

#Checking if the answers are correct
def day_profit():
    with engine.connect() as conn:
        result = conn.execute("SELECT s.sname,b.bname, b.cost - r.hour * s.pay as Profit, day from reserves r JOIN sailors s ON r.sid=s.sid JOIN boats b ON r.bid = b.bid;")
    print(result.fetchall())

def watch_list_sailors():
    with engine.connect() as conn:
        result = conn.execute("SELECT s.sname , s.pay , s.rating FROM sailors s WHERE s.rating <= 5 GROUP BY s.pay ORDER BY s.pay; ")
    print(result.fetchall())

def watch_list_boats():
    with engine.connect() as conn:
        result = conn.execute("SELECT b.bname, b.cond,b.cost FROM boats b WHERE cond='broken' OR cond='bad' ;")
    print(result.fetchall())

session = Session()

if  __name__ == "__main__":
    day_profit()
    watch_list_sailors()
    watch_list_boats()
    session.commit()
    session.close()