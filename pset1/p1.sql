--1 Select, for each boat, the sailor who made the highest number of reservations for that boat.

SELECT DISTINCT b.bname, s.sname, COUNT(*) 
FROM boats b JOIN reserves r ON b.bid = r.bid 
JOIN sailors s ON s.sid = r.sid GROUP BY b.bid, b.bname, s.sid, s.sname 
HAVING COUNT(*) >= ALL (SELECT COUNT(*) FROM reserves res
WHERE res.bid = b.bid GROUP BY res.sid) ORDER BY b.bname, s.sname;

--2 List, for every boat, the number of times it has been reserved, excluding those boats that have never been reserved (list the id and the name).
--3 List those sailors who have reserved every red boat (list the id and the name).
--4 List those sailors who have reserved only red boats.
--5 For which boat are there the most reservations?
--6 Select all sailors who have never reserved a red boat.
--7 Find the average age of sailors with a rating of 10.