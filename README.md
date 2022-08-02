# WorkOrder-Tracking

Technology
----------
- MVC Core - 3.1, Web API Core - 3.1, EF Core

- Repository pattern

- Identity (Authentication / Authorization) [MVC Core]

- JWT Token Based Authentication / Authorization [Web API Core]

- Sql Server

- Client(1) : Razor, JQuery, Ajax, Javascript, Html, Css, Bootstrap

- Client(2) : Angular, Html, Css, Bootstrap

- Client(3) : React, Html, Css, Bootstrap


## System Diagram->
![system_dia drawio](https://user-images.githubusercontent.com/26190114/166812919-f6e47ac9-df2c-43b4-9e4a-8368d8459e36.png)


# Database
![db_dia](https://user-images.githubusercontent.com/26190114/166802303-b1a54a9b-656e-46d7-91a6-9df148a7947d.PNG)

![db_auth_dia](https://user-images.githubusercontent.com/26190114/166802666-e5b50a14-5ca7-4bfe-a55a-b1bc5909b890.PNG)

# Screens



## Business Process & Constraints
* if workorder-startdate is null then workorder-status must be 0 (Not_Started)
* if operation-startdate is null then operation-status must be 0 (Not_Started)

* user can not create more than 1 work-order for any customer-order

* workorder-operation combination is UNIQUE

* when workorder is Start_Running,,, then and then 
	operation can be any of (Start_Running, Pause_Running, Completed, Can_Not_Complete) 

* when operation-startdate is not null && operation-status != Not_Started,,,
	then user can not do [ operation-startdate is null or operation-status == Not_Started ]

* when workorder-startdate is not null && workorder-status != Not_Started,,,
	then user can not do [ workorder-startdate is null or workorder-status == Not_Started ]

* workorder-startdate must be <= it's any of operations'-startdate

* workorder-startdate must be >= it's customerorder's order-date

* if operation is Not_Started then,,,
	it can not be Completed directly means operation must follow,,,
	Not_Started -> Start_Running -> Completed sequence

* when OpQTYDone>=OpQTYRequired then,,,
	- this operation-status can become operation-status-completed
* when operation-status-completed by supervisor then,,,
	- operator can not do either operation-status-start_running or operation-status-pause_running
* when operation-pause-running by supervisor then,,,
	- operator can not do either operation-status-start_running or operation-status-pause_running
* when all operations for any workorder become operation-status-completed then,,,
	- workorder-status can become workorder-status-completed
* when workorder-status-completed by supervisor then,,,
	- it's any operations can not be anything except operation-status-completed

[Supervisor]
- operation-startdate = first time when operation starts
- operation-enddate = when operation ends
- workorder-startdate = first time when workorder starts
- workorder-enddate = when workorder ends


[Operator]							
- operator can select 
	workorder, 
	operation-id / operation number,
	operation-status (start-running/pause-running),
		- start-running 
			- Can not enter OpQtyDone
			- operation-start-run-time (auto(system date-time) - operator can not change time)
		- pause-running 
			- Must enter OpQtyDone
			- operation-pause-run-time (auto(system date-time) - operator can not change time)
	
