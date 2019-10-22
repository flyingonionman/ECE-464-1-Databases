/*
SQL queries to populate a Sailors and Boats dataset
*/
create table sailors(
    sid int PRIMARY KEY,
    sname varchar(30),
    rating int,
    age int,
    pay int,
);

create table reserves(
    sid int,
    bid int,
    hour int,
    day date,
	PRIMARY KEY (sid, bid, hour,day)
);

create table boats(
    bid int PRIMARY KEY,
	bname char(20),
	color char(10),
    cost int,
    cond char(10),
	length int
);

insert into sailors values (22,'dusting',7,45.0,12);
insert into sailors values (29,'brutus',1,33.0,12);
insert into sailors values (31,'lubber',8,55.5,13);
insert into sailors values (32,'andy',8,25.5,34);
insert into sailors values (58,'rusty',10,35,18);
insert into sailors values (64,'horatio',7,16,20);
insert into sailors values (71,'zorba',10,35,22);
insert into sailors values (74,'horatio',9,25.5,23);
insert into sailors values (85,'art',3,25.5,50);
insert into sailors values (95,'bob',3,63.5,14);
insert into sailors values (23,'emilio',7,45.0,35);
insert into sailors values (24,'scruntus',1,33.0,38);
insert into sailors values (35,'figaro',8,55.5,40);
insert into sailors values (59,'stum',8,25.5,35);
insert into sailors values (60,'jit',10,35,36);
insert into sailors values (61,'ossola',7,16,60);
insert into sailors values (62,'shaun',10,35,24);
insert into sailors values (88,'dan',9,25.5,28);
insert into sailors values (89,'dye',3,25.5,29);
insert into sailors values (90,'vin',3,63.5,31);

insert into reserves values (23,104,8,'1998/10/10');
insert into reserves values (24,104,4,'1998/10/10');
insert into reserves values (35,104,5,'1998/8/10');
insert into reserves values (59,105,6,'1998/7/10');
insert into reserves values (23,105,9,'1998/11/10');
insert into reserves values (35,105,10,'1998/11/6');
insert into reserves values (59,106,8,'1998/11/12');
insert into reserves values (60,106,4,'1998/9/5');
insert into reserves values (60,106,3,'1998/9/8');
insert into reserves values (88,107,7,'1998/9/8');
insert into reserves values (89,108,5,'1998/10/10');
insert into reserves values (90,109,8,'1998/10/10');
insert into reserves values (89,109,2,'1998/8/10');
insert into reserves values (60,109,9,'1998/7/10');
insert into reserves values (59,109,4,'1998/11/10');
insert into reserves values (62,110,3,'1998/11/6');
insert into reserves values (88,110,6,'1998/11/12');
insert into reserves values (88,110,5,'1998/9/5');
insert into reserves values (88,111,9,'1998/9/8');
insert into reserves values (61,112,2,'1998/9/8');
insert into reserves values (22,101,1,'1998/10/10');
insert into reserves values (22,102,4,'1998/10/10');
insert into reserves values (22,103,4,'1998/8/10');
insert into reserves values (22,104,3,'1998/7/10');
insert into reserves values (31,102,5,'1998/11/10');
insert into reserves values (31,103,7,'1998/11/6');
insert into reserves values (31,104,8,'1998/11/12');
insert into reserves values (64,101,1,'1998/9/5');
insert into reserves values (64,102,2,'1998/9/8');
insert into reserves values (74,103,7,'1998/9/8');

insert into boats values (101,'Interlake','blue',500,'ok',45);
insert into boats values (102,'Interlake','red',240,'bad', 45);
insert into boats values (103,'Clipper','green',440,'good', 40);
insert into boats values (104,'Clipper','red',300,'new', 40);
insert into boats values (105,'Marine','red',600,'new', 35);
insert into boats values (106,'Marine','green',180,'broken', 35);
insert into boats values (107,'Marine','blue',150,'ok',35);
insert into boats values (108,'Driftwood','red',220,'good', 35);
insert into boats values (109,'Driftwood','blue',240,'new', 35);
insert into boats values (110,'Klapser','red',280,'ok', 30);
insert into boats values (111,'Sooney','gren',320,'broken', 28);
insert into boats values (112,'Sooney','red',360,'good' ,28);
