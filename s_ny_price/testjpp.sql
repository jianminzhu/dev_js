SELECT p .NO,p .p AS nyp,  pd.o+(p.p-(pd.nyo-pd.offset))  * 7 AS jpp , CONVERT_TZ(`p`.`dt`,'-08:00','+00:00') AS DATETIME FROM  ps p  ,ps_d pd
WHERE p .NO=pd.no 
AND DATE_FORMAT(p .dt, '%Y-%m-%d') =DATE_FORMAT(pd.date, '%Y-%m-%d')
ORDER BY p.dt DESC  